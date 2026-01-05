import api from "@/config/axios.config";
import type { ApiReponse } from "@/types";

const organizationRoutes = Object.freeze({
  getlabs: "/organization",
});

const fetchLabsApi = async (): Promise<ApiReponse> => {
  const response = await api.get(organizationRoutes.getlabs);
  return response.data;
};

export { fetchLabsApi };
