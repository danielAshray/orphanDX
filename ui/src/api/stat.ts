import api from "@/config/axios.config";
import type { ApiReponse } from "@/types";

const fetchFacilityStatApi = async (): Promise<ApiReponse> => {
  const response = await api.get("/stat/facility");

  return response.data;
};

export { fetchFacilityStatApi };
