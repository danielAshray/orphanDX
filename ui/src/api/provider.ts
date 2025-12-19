import api from "@/config/axios.config";

const ProviderRoutes = Object.freeze({
  patient: (id: number | string) => `/patient/${id}`,
  patients: "/patient",
});

const fetchPatientByIdApi = async (id: number | string) => {
  const response = await api
    .get(ProviderRoutes.patient(id))
    .then((res) => res.data);

  return response;
};

const fetchPatientsApi = async () => {
  const response = await api
    .get(ProviderRoutes.patients)
    .then((res) => res.data);

  return response;
};

export { fetchPatientByIdApi, fetchPatientsApi };
