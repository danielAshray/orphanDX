export class ApiError extends Error {
  code: number;
  detail?: any;

  constructor(code: number, message: string, detail?: any) {
    super(message);
    this.code = code;
    this.detail = detail;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = "Bad Request", detail?: any) {
    return new ApiError(400, message, detail);
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiError(401, message);
  }

  static forbidden(message = "Forbidden") {
    return new ApiError(403, message);
  }

  static notFound(message = "Resource not found") {
    return new ApiError(404, message);
  }

  static internal(message = "Internal server error", detail?: any) {
    return new ApiError(500, message, detail);
  }
}
