export class GeminiError extends Error {
  constructor(message: string, public cause?: unknown) {
    super(message);
    this.name = 'GeminiError';
  }
}

export function isGeminiError(error: unknown): error is GeminiError {
  return error instanceof GeminiError;
}

export function createGeminiError(message: string, cause?: unknown): GeminiError {
  return new GeminiError(
    `Gemini API Error: ${message}${cause instanceof Error ? ` - ${cause.message}` : ''}`,
    cause
  );
}