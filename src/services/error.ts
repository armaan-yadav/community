export class AuthError extends Error {
  code: number;
  success: boolean;
  originalError?: unknown;

  constructor(message: string, code: number = 0, originalError?: unknown) {
    super(message);
    this.name = "AuthError";
    this.code = code;
    this.success = false;
    this.originalError = originalError;

    Object.setPrototypeOf(this, AuthError.prototype);
  }

  static fromAppwriteError(error: { message?: string; code?: number }) {
    return new AuthError(
      error.message || "Authentication failed",
      error.code ?? 0,
      error
    );
  }

  log(): void {
    console.error(
      `AuthError (${this.code}): ${this.message}`,
      this.originalError
    );
  }
}
