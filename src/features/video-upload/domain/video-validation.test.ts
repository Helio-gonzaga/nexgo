import assert from "node:assert/strict";
import test from "node:test";

import {
  VIDEO_VALIDATION_POLICY_V1,
  validateVideoFile,
  type VideoFileCandidate,
} from "./video-validation";

function candidate(
  overrides: Partial<VideoFileCandidate> = {},
): VideoFileCandidate {
  return {
    name: "partida.mp4",
    type: "video/mp4",
    size: 1_000,
    ...overrides,
  };
}

test("aceita um MP4 válido", () => {
  const file = candidate();

  assert.deepEqual(validateVideoFile(file), {
    ok: true,
    file,
    declaredMimeType: "video/mp4",
    resolvedMimeType: "video/mp4",
    extension: ".mp4",
  });
});

test("aceita um WebM válido", () => {
  const file = candidate({ name: "partida.webm", type: "video/webm" });

  assert.deepEqual(validateVideoFile(file), {
    ok: true,
    file,
    declaredMimeType: "video/webm",
    resolvedMimeType: "video/webm",
    extension: ".webm",
  });
});

test("usa a extensão válida como fallback quando o MIME está vazio", () => {
  const file = candidate({ type: "" });
  const result = validateVideoFile(file);

  assert.equal(result.ok, true);

  if (result.ok) {
    assert.equal(result.declaredMimeType, "");
    assert.equal(result.resolvedMimeType, "video/mp4");
  }
});

test("rejeita MIME não suportado", () => {
  assert.deepEqual(
    validateVideoFile(candidate({ type: "video/quicktime" })),
    { ok: false, code: "UNSUPPORTED_TYPE" },
  );
});

test("rejeita MIME e extensão incompatíveis", () => {
  assert.deepEqual(
    validateVideoFile(candidate({ name: "partida.webm", type: "video/mp4" })),
    { ok: false, code: "UNSUPPORTED_TYPE" },
  );
});

test("rejeita arquivo vazio", () => {
  assert.deepEqual(validateVideoFile(candidate({ size: 0 })), {
    ok: false,
    code: "EMPTY_FILE",
  });
});

test("rejeita arquivo acima de 200 MB", () => {
  assert.deepEqual(
    validateVideoFile(
      candidate({ size: VIDEO_VALIDATION_POLICY_V1.maxBytes + 1 }),
    ),
    { ok: false, code: "FILE_TOO_LARGE" },
  );
});

test("aceita arquivo com exatamente 200 MB", () => {
  const result = validateVideoFile(
    candidate({ size: VIDEO_VALIDATION_POLICY_V1.maxBytes }),
  );

  assert.equal(result.ok, true);
});

test("rejeita arquivo sem extensão", () => {
  assert.deepEqual(validateVideoFile(candidate({ name: "partida" })), {
    ok: false,
    code: "UNSUPPORTED_TYPE",
  });
});

test("normaliza extensão em maiúsculas", () => {
  const result = validateVideoFile(candidate({ name: "PARTIDA.MP4" }));

  assert.equal(result.ok, true);

  if (result.ok) {
    assert.equal(result.extension, ".mp4");
    assert.equal(result.resolvedMimeType, "video/mp4");
  }
});
