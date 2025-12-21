import api from "@/config/axios.config";
import type { ApiReponse } from "@/types";

const OrderRoutes = Object.freeze({
  dashboard: "/order",
  track: "/order/track",
});

const fetchDashboardApi = async (): Promise<ApiReponse> => {
  const response = await api.get(OrderRoutes.dashboard);
  return response.data;
};

// interface OrderTrackingFilters {
//   status?: string;
//   patientId?: string;
//   providerId?: string;
// }

const fetchOrderTrackingApi = async (): // filters?: OrderTrackingFilters
Promise<ApiReponse> => {
  const response = await api.get(
    OrderRoutes.track
    // { params: filters }
  );
  return response.data;
};

export { fetchDashboardApi, fetchOrderTrackingApi };
