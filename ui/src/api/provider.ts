import api from "@/config/axios.config";
import type { ApiReponse } from "@/types";

const ProviderRoutes = Object.freeze({
  patient: (id: number | string) => `/patient/${id}`,
  patients: "/patient",
});

const fetchPatientByIdApi = async (
  id: number | string
): Promise<ApiReponse> => {
  const response = await api.get(ProviderRoutes.patient(id));

  return response.data;
};

const fetchPatientsApi = async (): Promise<ApiReponse> => {
  const response = await api.get(ProviderRoutes.patients);

  return response.data;
};

export { fetchPatientByIdApi, fetchPatientsApi };
