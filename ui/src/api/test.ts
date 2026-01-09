import api from "@/config/axios.config";
import type { ApiReponse } from "@/types";

const testRoutes = Object.freeze({
  getTests: "/test",
});

const fetchTestsApi = async (): Promise<ApiReponse> => {
  const response = await api.get(testRoutes.getTests);
  return response.data;
};

export { fetchTestsApi };
