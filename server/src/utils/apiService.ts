export type ApiErrorType = {
  code: number;
  message: string;
  detail?: any;
};

const createApiError  = (
  code: number,
  message: string,
  detail?: any
): ApiErrorType => ({
  code,
  message,
  detail,
});

const ApiError = {
  badRequest: (message = "Bad Request", detail?: any) =>
    createApiError(400, message, detail),
  unauthorized: (message = "Unauthorized") => createApiError(401, message),
  forbidden: (message = "Forbidden") => createApiError(403, message),
  notFound: (message = "Resource not found") => createApiError(404, message),
  internal: (message = "Internal server error", detail?: any) =>
    createApiError(500, message, detail),
};

export { ApiError };
