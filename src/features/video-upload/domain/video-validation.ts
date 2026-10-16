export const VIDEO_VALIDATION_POLICY_V1 = {
  maxBytes: 200_000_000,
  acceptedMimeTypes: ["video/mp4", "video/webm"],
  acceptedExtensions: [".mp4", ".webm"],
} as const;

export type SupportedVideoMimeType =
  (typeof VIDEO_VALIDATION_POLICY_V1.acceptedMimeTypes)[number];

export type SupportedVideoExtension =
  (typeof VIDEO_VALIDATION_POLICY_V1.acceptedExtensions)[number];

export type VideoFileCandidate = {
  readonly name: string;
  readonly type: string;
  readonly size: number;
};

export type VideoValidationErrorCodeV1 =
  | "MULTIPLE_FILES"
  | "UNSUPPORTED_TYPE"
  | "FILE_TOO_LARGE"
  | "EMPTY_FILE";

export type VideoValidationResultV1 =
  | {
      readonly ok: true;
      readonly file: VideoFileCandidate;
      readonly declaredMimeType: SupportedVideoMimeType | "";
      readonly resolvedMimeType: SupportedVideoMimeType;
      readonly extension: SupportedVideoExtension;
    }
  | {
      readonly ok: false;
      readonly code: Exclude<VideoValidationErrorCodeV1, "MULTIPLE_FILES">;
    };

const FORMAT_BY_EXTENSION: Readonly<
  Record<SupportedVideoExtension, SupportedVideoMimeType>
> = {
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

function resolveExtension(name: string): SupportedVideoExtension | null {
  const lastDotIndex = name.lastIndexOf(".");

  if (lastDotIndex < 0) {
    return null;
  }

  const extension = name.slice(lastDotIndex).toLowerCase();

  return VIDEO_VALIDATION_POLICY_V1.acceptedExtensions.find(
    (acceptedExtension) => acceptedExtension === extension,
  ) ?? null;
}

/**
 * Performs preliminary validation only. Browser metadata and codec support are
 * deliberately deferred to the interactive boundary planned for Stage 3.
 */
export function validateVideoFile(
  file: VideoFileCandidate,
): VideoValidationResultV1 {
  if (file.size === 0) {
    return { ok: false, code: "EMPTY_FILE" };
  }

  if (file.size > VIDEO_VALIDATION_POLICY_V1.maxBytes) {
    return { ok: false, code: "FILE_TOO_LARGE" };
  }

  const extension = resolveExtension(file.name);

  if (extension === null) {
    return { ok: false, code: "UNSUPPORTED_TYPE" };
  }

  const resolvedMimeType = FORMAT_BY_EXTENSION[extension];

  if (file.type !== "" && file.type !== resolvedMimeType) {
    return { ok: false, code: "UNSUPPORTED_TYPE" };
  }

  return {
    ok: true,
    file,
    declaredMimeType: file.type,
    resolvedMimeType,
    extension,
  };
}
