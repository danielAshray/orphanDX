export function getErrorMessage(error: unknown): string {
  return (
    (error as { response?: { data?: { message: string } } }).response?.data
      ?.message || "Unexpected Error Occurred!!"
  );
}
