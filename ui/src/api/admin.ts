import api from "@/config/axios.config";
import type { ApiReponse } from "@/types";

const AdminRoutes = Object.freeze({
  details: "/admin",
  overview: "/admin/overview",
  facilities: "/admin/facilities",
  labs: "/admin/labs",
  providers: "/admin/providers",
  orders: "/admin/orders",
});

const fetchDetailsApi = async (): Promise<ApiReponse> => {
  const response = await api.get(AdminRoutes.details);
  return response.data;
};

const fetchOverviewApi = async (): Promise<ApiReponse> => {
  const response = await api.get(AdminRoutes.overview);
  return response.data;
};

const fetchFacilitiesApi = async (): Promise<ApiReponse> => {
  const response = await api.get(AdminRoutes.facilities);
  return response.data;
};

const fetchLabsApi = async (): Promise<ApiReponse> => {
  const response = await api.get(AdminRoutes.labs);
  return response.data;
};

const fetchProvidersApi = async (): Promise<ApiReponse> => {
  const response = await api.get(AdminRoutes.providers);
  return response.data;
};

const fetchOrdersApi = async (): Promise<ApiReponse> => {
  const response = await api.get(AdminRoutes.orders);
  return response.data;
};

export {
  fetchDetailsApi,
  fetchOverviewApi,
  fetchFacilitiesApi,
  fetchLabsApi,
  fetchProvidersApi,
  fetchOrdersApi,
};
