import crypto from "crypto";

const generateRandomString = (length: number) => {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
};

const mapStatus = (status: string): string => {
  switch (status) {
    case "PENDING":
      return "pending";
    case "COMPLETED":
      return "completed";
    case "CANCELLED":
      return "cancelled";
    case "FAILED":
      return "cancelled";
    case "IN_PROGRESS":
      return "in-progress";
    case "SENT":
      return "sent";
    case "SCHEDULED":
      return "scheduled";
    case "COLLECTED":
      return "collected";
    default:
      return "in-progress";
  }
};

export { generateRandomString, mapStatus };
