"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";

import {
  validateVideoFile,
  type SupportedVideoExtension,
  type SupportedVideoMimeType,
  type VideoValidationErrorCodeV1,
} from "../domain/video-validation";

type VideoUiErrorCode =
  | VideoValidationErrorCodeV1
  | "PREVIEW_UNAVAILABLE"
  | "UNKNOWN_ERROR";

type VideoUiError = {
  readonly code: VideoUiErrorCode;
  readonly message: string;
};

type LocalVideo = {
  readonly file: File;
  readonly objectUrl: string;
  readonly name: string;
  readonly sizeBytes: number;
  readonly declaredMimeType: SupportedVideoMimeType | "";
  readonly resolvedMimeType: SupportedVideoMimeType;
  readonly extension: SupportedVideoExtension;
  readonly durationSeconds: number;
};

type VideoUploadState =
  | { readonly status: "idle" }
  | { readonly status: "dragging"; readonly currentVideo: LocalVideo | null }
  | {
      readonly status: "loading";
      readonly candidateName: string;
      readonly previousVideo: LocalVideo | null;
    }
  | {
      readonly status: "ready";
      readonly video: LocalVideo;
      readonly replacementError?: VideoUiError;
    }
  | { readonly status: "error"; readonly error: VideoUiError };

type MetadataProbeResult =
  | { readonly ok: true; readonly durationSeconds: number }
  | { readonly ok: false };

const ERROR_MESSAGES: Record<VideoUiErrorCode, string> = {
  MULTIPLE_FILES: "Selecione apenas um vídeo por vez.",
  UNSUPPORTED_TYPE: "Formato não suportado. Use um arquivo MP4 ou WebM.",
  FILE_TOO_LARGE: "O vídeo excede o limite de 200 MB.",
  EMPTY_FILE: "O arquivo está vazio. Selecione outro vídeo.",
  PREVIEW_UNAVAILABLE:
    "Não foi possível validar ou reproduzir este vídeo. O arquivo ou codec pode não ser compatível com o navegador.",
  UNKNOWN_ERROR:
    "Não foi possível preparar o vídeo. Tente selecionar o arquivo novamente.",
};

function createError(code: VideoUiErrorCode): VideoUiError {
  return { code, message: ERROR_MESSAGES[code] };
}

function probeVideoMetadata(
  objectUrl: string,
  mimeType: SupportedVideoMimeType,
  onComplete: (result: MetadataProbeResult) => void,
): () => void {
  const video = document.createElement("video");
  let settled = false;

  const timeoutId = window.setTimeout(() => finish({ ok: false }), 10_000);

  function cleanup() {
    window.clearTimeout(timeoutId);
    video.onloadedmetadata = null;
    video.onerror = null;
    video.pause();
    video.removeAttribute("src");
    video.load();
  }

  function finish(result: MetadataProbeResult) {
    if (settled) {
      return;
    }

    settled = true;
    cleanup();
    onComplete(result);
  }

  if (video.canPlayType(mimeType) === "") {
    queueMicrotask(() => finish({ ok: false }));
    return cleanup;
  }

  video.preload = "metadata";
  video.onloadedmetadata = () => {
    const durationSeconds = video.duration;

    if (!Number.isFinite(durationSeconds) || durationSeconds < 0) {
      finish({ ok: false });
      return;
    }

    finish({ ok: true, durationSeconds });
  };
  video.onerror = () => finish({ ok: false });
  video.src = objectUrl;
  video.load();

  return cleanup;
}

function formatFileSize(sizeBytes: number): string {
  return `${new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  }).format(sizeBytes / 1_000_000)} MB`;
}

function formatDuration(durationSeconds: number): string {
  const totalSeconds = Math.floor(durationSeconds);
  const hours = Math.floor(totalSeconds / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function UploadIllustration({ loading = false }: { loading?: boolean }) {
  return (
    <div className="relative grid size-16 place-items-center rounded-2xl border border-blue-400/25 bg-gradient-to-br from-blue-500/20 via-cyan-400/10 to-violet-500/20 text-accent-blue shadow-[0_0_36px_rgba(56,189,248,0.16)] sm:size-20">
      <span className="absolute inset-2 rounded-xl border border-white/5" />
      {loading ? (
        <span
          aria-hidden="true"
          className="size-7 animate-spin rounded-full border-2 border-blue-300/25 border-t-accent-blue"
        />
      ) : (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-8 sm:size-9"
          fill="none"
        >
          <path
            d="M12 15V4m0 0L7.75 8.25M12 4l4.25 4.25"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 14.5v3A2.5 2.5 0 0 0 7.5 20h9a2.5 2.5 0 0 0 2.5-2.5v-3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}

function getVisibleVideo(state: VideoUploadState): LocalVideo | null {
  if (state.status === "ready") {
    return state.video;
  }

  if (state.status === "loading") {
    return state.previousVideo;
  }

  if (state.status === "dragging") {
    return state.currentVideo;
  }

  return null;
}

export function VideoUploadPanel() {
  const [state, setState] = useState<VideoUploadState>({ status: "idle" });
  const stateRef = useRef(state);
  const dragDepthRef = useRef(0);
  const attemptRef = useRef(0);
  const candidateProbeRef = useRef<(() => void) | null>(null);
  const candidateUrlRef = useRef<string | null>(null);
  const pendingRevocationRef = useRef<string | null>(null);
  const ownedUrlsRef = useRef(new Set<string>());

  const updateState = useCallback((nextState: VideoUploadState) => {
    stateRef.current = nextState;
    setState(nextState);
  }, []);

  const revokeUrl = useCallback((objectUrl: string) => {
    if (!ownedUrlsRef.current.delete(objectUrl)) {
      return;
    }

    URL.revokeObjectURL(objectUrl);
  }, []);

  const cancelCandidate = useCallback(() => {
    candidateProbeRef.current?.();
    candidateProbeRef.current = null;

    if (candidateUrlRef.current !== null) {
      revokeUrl(candidateUrlRef.current);
      candidateUrlRef.current = null;
    }
  }, [revokeUrl]);

  useEffect(() => {
    const pendingUrl = pendingRevocationRef.current;

    if (pendingUrl !== null) {
      pendingRevocationRef.current = null;
      revokeUrl(pendingUrl);
    }
  }, [revokeUrl, state]);

  useEffect(() => {
    const ownedUrls = ownedUrlsRef.current;

    return () => {
      attemptRef.current += 1;
      candidateProbeRef.current?.();
      candidateProbeRef.current = null;

      for (const objectUrl of ownedUrls) {
        URL.revokeObjectURL(objectUrl);
      }

      ownedUrls.clear();
    };
  }, []);

  const showError = useCallback(
    (error: VideoUiError, previousVideo: LocalVideo | null) => {
      if (previousVideo !== null) {
        updateState({ status: "ready", video: previousVideo, replacementError: error });
        return;
      }

      updateState({ status: "error", error });
    },
    [updateState],
  );

  const processFiles = useCallback(
    (files: readonly File[], previousVideo: LocalVideo | null) => {
      if (files.length === 0) {
        return;
      }

      if (files.length > 1) {
        showError(createError("MULTIPLE_FILES"), previousVideo);
        return;
      }

      const file = files[0];
      const validation = validateVideoFile(file);

      if (!validation.ok) {
        showError(createError(validation.code), previousVideo);
        return;
      }

      attemptRef.current += 1;
      const attempt = attemptRef.current;
      cancelCandidate();

      let objectUrl: string;

      try {
        objectUrl = URL.createObjectURL(file);
      } catch {
        showError(createError("UNKNOWN_ERROR"), previousVideo);
        return;
      }

      ownedUrlsRef.current.add(objectUrl);
      candidateUrlRef.current = objectUrl;
      updateState({ status: "loading", candidateName: file.name, previousVideo });

      candidateProbeRef.current = probeVideoMetadata(
        objectUrl,
        validation.resolvedMimeType,
        (result) => {
          if (attempt !== attemptRef.current) {
            revokeUrl(objectUrl);
            return;
          }

          candidateProbeRef.current = null;
          candidateUrlRef.current = null;

          if (!result.ok) {
            revokeUrl(objectUrl);
            showError(createError("PREVIEW_UNAVAILABLE"), previousVideo);
            return;
          }

          const video: LocalVideo = {
            file,
            objectUrl,
            name: file.name,
            sizeBytes: file.size,
            declaredMimeType: validation.declaredMimeType,
            resolvedMimeType: validation.resolvedMimeType,
            extension: validation.extension,
            durationSeconds: result.durationSeconds,
          };

          if (previousVideo !== null) {
            pendingRevocationRef.current = previousVideo.objectUrl;
          }

          updateState({ status: "ready", video });
        },
      );
    },
    [cancelCandidate, revokeUrl, showError, updateState],
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.currentTarget.files ?? []);
    const previousVideo = getVisibleVideo(stateRef.current);
    event.currentTarget.value = "";
    processFiles(files, previousVideo);
  };

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (stateRef.current.status === "loading") {
      return;
    }

    dragDepthRef.current += 1;
    updateState({
      status: "dragging",
      currentVideo: getVisibleVideo(stateRef.current),
    });
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (stateRef.current.status !== "loading") {
      event.dataTransfer.dropEffect = "copy";
    }
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);

    if (dragDepthRef.current > 0 || stateRef.current.status !== "dragging") {
      return;
    }

    const currentVideo = stateRef.current.currentVideo;
    updateState(
      currentVideo === null
        ? { status: "idle" }
        : { status: "ready", video: currentVideo },
    );
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragDepthRef.current = 0;

    if (stateRef.current.status === "loading") {
      return;
    }

    const previousVideo = getVisibleVideo(stateRef.current);
    processFiles(Array.from(event.dataTransfer.files), previousVideo);
  };

  const handleRemove = () => {
    const currentVideo = getVisibleVideo(stateRef.current);
    attemptRef.current += 1;
    cancelCandidate();

    if (currentVideo !== null) {
      pendingRevocationRef.current = currentVideo.objectUrl;
    }

    updateState({ status: "idle" });
  };

  const handlePlaybackError = () => {
    if (stateRef.current.status !== "ready") {
      return;
    }

    pendingRevocationRef.current = stateRef.current.video.objectUrl;
    updateState({ status: "error", error: createError("PREVIEW_UNAVAILABLE") });
  };

  const visibleVideo = getVisibleVideo(state);
  const isDragging = state.status === "dragging";
  const isLoading = state.status === "loading";
  const primaryError = state.status === "error" ? state.error : null;
  const replacementError =
    state.status === "ready" ? state.replacementError ?? null : null;
  const liveMessage = isLoading
    ? `Validando ${state.candidateName}.`
    : primaryError?.message ??
      replacementError?.message ??
      (state.status === "ready" ? "Vídeo validado e pronto para reprodução local." : "");

  return (
    <section
      aria-labelledby="upload-title"
      className="premium-panel upload-grid relative mt-8 overflow-hidden rounded-[var(--radius-feature)] p-4 sm:mt-10 sm:p-5 lg:p-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-400/70 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-1/2 size-64 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex min-h-[22rem] flex-col items-center justify-center rounded-2xl border bg-[#061020]/72 px-5 py-10 text-center sm:min-h-0 sm:px-10 sm:py-9 ${
          isDragging
            ? "border-accent-blue bg-surface-raised/85 shadow-[inset_0_0_42px_rgba(56,189,248,0.08)]"
            : "border-dashed border-blue-300/25"
        }`}
      >
        {visibleVideo === null || isDragging ? (
          <>
            <label className="flex cursor-pointer flex-col items-center rounded-2xl focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-accent-blue">
              <input
                type="file"
                accept="video/mp4,video/webm,.mp4,.webm"
                multiple={false}
                onChange={handleInputChange}
                disabled={isLoading}
                className="sr-only"
                aria-describedby="upload-requirements upload-feedback"
              />
              <UploadIllustration loading={isLoading} />
              <p className="mt-5 text-xs font-semibold tracking-[0.16em] text-accent-blue uppercase">
                {isLoading ? "Validando vídeo" : isDragging ? "Solte para continuar" : "Primeiro passo"}
              </p>
              <h2
                id="upload-title"
                className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-white sm:text-3xl"
              >
                {isLoading
                  ? "Preparando seu preview"
                  : isDragging
                    ? visibleVideo === null
                      ? "Solte o vídeo aqui"
                      : "Solte para substituir o vídeo"
                    : "Adicione o vídeo da partida"}
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-text-secondary sm:text-base">
                {isLoading
                  ? "Estamos verificando o formato e os metadados no seu dispositivo."
                  : "Arraste o vídeo da partida ou selecione um arquivo para começar."}
              </p>
              {!isLoading && (
                <span className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(37,99,235,0.24)]">
                  {visibleVideo === null ? "Selecionar vídeo" : "Selecionar substituto"}
                </span>
              )}
            </label>

            {primaryError !== null && (
              <div
                role="alert"
                className="mt-5 max-w-xl rounded-xl border border-error/30 bg-error/8 px-4 py-3 text-sm text-rose-200"
              >
                {primaryError.message}
              </div>
            )}

            <div
              id="upload-requirements"
              className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-text-muted"
            >
              <span>MP4 ou WebM</span>
              <span aria-hidden="true" className="size-1 rounded-full bg-border-active/70" />
              <span>Até 200 MB</span>
              <span aria-hidden="true" className="size-1 rounded-full bg-border-active/70" />
              <span>Processamento local nesta etapa</span>
            </div>
          </>
        ) : (
          <div className="grid w-full gap-5 text-left lg:grid-cols-[minmax(0,1.45fr)_minmax(16rem,0.55fr)] lg:items-center">
            <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-black/35 shadow-[0_18px_44px_rgba(0,0,0,0.3)]">
              <video
                key={visibleVideo.objectUrl}
                src={visibleVideo.objectUrl}
                controls
                preload="metadata"
                playsInline
                onError={handlePlaybackError}
                aria-label={`Preview local de ${visibleVideo.name}`}
                className="aspect-video w-full bg-black object-contain"
              >
                Seu navegador não oferece suporte ao player de vídeo.
              </video>
              {isLoading && (
                <div className="absolute inset-x-3 top-3 flex min-w-0 items-center gap-2 rounded-lg border border-accent-blue/25 bg-[#061020]/92 px-3 py-2 text-xs text-blue-100 backdrop-blur-md">
                  <span className="size-3 shrink-0 animate-spin rounded-full border border-blue-200/30 border-t-accent-blue" />
                  <span className="truncate">Validando {state.candidateName}</span>
                </div>
              )}
            </div>

            <div className="min-w-0 overflow-hidden lg:px-1">
              <p className="text-xs font-semibold tracking-[0.16em] text-success uppercase">
                Vídeo pronto
              </p>
              <div className="group/file-name relative mt-2 min-w-0 max-w-full">
                <h2
                  id="upload-title"
                  tabIndex={0}
                  aria-describedby="video-file-name-tooltip"
                  className="block max-w-full truncate rounded-sm text-xl font-semibold tracking-[-0.02em] text-white outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-4 focus-visible:ring-offset-[#061020] sm:text-2xl"
                >
                  {visibleVideo.name}
                </h2>
                <span
                  id="video-file-name-tooltip"
                  role="tooltip"
                  className="pointer-events-none invisible absolute top-full left-0 z-20 mt-2 max-w-full rounded-lg border border-border-subtle bg-[#0d1930] px-3 py-2 text-sm leading-5 break-all text-text-secondary opacity-0 shadow-[0_12px_32px_rgba(0,0,0,0.4)] transition-opacity group-hover/file-name:visible group-hover/file-name:opacity-100 group-focus-within/file-name:visible group-focus-within/file-name:opacity-100 motion-reduce:transition-none"
                >
                  {visibleVideo.name}
                </span>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:mt-5">
                <div className="rounded-xl border border-border-subtle bg-surface/65 p-3">
                  <dt className="text-xs text-text-muted">Formato</dt>
                  <dd className="mt-1 font-medium text-white">{visibleVideo.extension.slice(1).toUpperCase()}</dd>
                </div>
                <div className="rounded-xl border border-border-subtle bg-surface/65 p-3">
                  <dt className="text-xs text-text-muted">Tamanho</dt>
                  <dd className="mt-1 font-medium text-white">{formatFileSize(visibleVideo.sizeBytes)}</dd>
                </div>
                <div className="col-span-2 rounded-xl border border-border-subtle bg-surface/65 p-3">
                  <dt className="text-xs text-text-muted">Duração</dt>
                  <dd className="mt-1 font-medium text-white">{formatDuration(visibleVideo.durationSeconds)}</dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-wrap gap-3 sm:mt-5">
                <label className={`inline-flex min-h-11 items-center justify-center rounded-xl border border-accent-blue/35 bg-blue-500/10 px-4 text-sm font-semibold text-blue-100 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent-blue ${isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}>
                  <input
                    type="file"
                    accept="video/mp4,video/webm,.mp4,.webm"
                    multiple={false}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="sr-only"
                    aria-label="Substituir vídeo"
                  />
                  Substituir
                </label>
                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={isLoading}
                  className="min-h-11 cursor-pointer rounded-xl border border-border-subtle px-4 text-sm font-semibold text-text-secondary outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-[#061020] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Remover
                </button>
              </div>

              {replacementError !== null && (
                <div
                  role="alert"
                  className="mt-4 rounded-xl border border-error/30 bg-error/8 px-4 py-3 text-sm leading-6 text-rose-200"
                >
                  {replacementError.message} O vídeo anterior foi preservado.
                </div>
              )}
            </div>
          </div>
        )}

        <p id="upload-feedback" className="sr-only" aria-live="polite" aria-atomic="true">
          {liveMessage}
        </p>
      </div>
    </section>
  );
}
