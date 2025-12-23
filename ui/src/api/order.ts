import { Notification } from "@/components";
import api from "@/config/axios.config";
import { getErrorMessage } from "@/lib/utils";
import type { ApiReponse, completeOrderProps } from "@/types";
import { useMutation } from "@tanstack/react-query";

const createOrderApi = async ({
  recomendationIds,
}: {
  recomendationIds: string[];
}): Promise<ApiReponse> => {
  const { data } = await api.post<ApiReponse>(`/order/`, {
    recomendationIds,
    testName: "my test",
    cptCode: "TM809",
  });

  return data;
};

const completeOrderApi = async (
  payload: completeOrderProps
): Promise<ApiReponse> => {
  const { data } = await api.put<ApiReponse>(`/order/complete`, payload);

  return data;
};

const useCompleteOrder = () => {
  return useMutation({
    mutationFn: (props: completeOrderProps) => completeOrderApi(props),
    onSuccess: () => {
      Notification({
        toastMessage: "Operation successfull",
        toastStatus: "success",
      });
    },

    onError: (error: any) =>
      Notification({
        toastMessage: getErrorMessage(error),
        toastStatus: "error",
      }),
  });
};

const useCreateOrder = () => {
  return useMutation({
    mutationFn: (props: { recomendationIds: string[] }) =>
      createOrderApi(props),
    onSuccess: () => {
      Notification({
        toastMessage: "Operation successfull",
        toastStatus: "success",
      });
    },

    onError: (error: any) =>
      Notification({
        toastMessage: getErrorMessage(error),
        toastStatus: "error",
      }),
  });
};

const OrderRoutes = Object.freeze({
  dashboard: "/order",
  track: "/order/track",
});

const fetchDashboardApi = async (): Promise<ApiReponse> => {
  const response = await api.get(OrderRoutes.dashboard);
  return response.data;
};

const fetchOrderTrackingApi = async (): Promise<ApiReponse> => {
  const response = await api.get(OrderRoutes.track);
  return response.data;
};

export {
  fetchDashboardApi,
  fetchOrderTrackingApi,
  useCreateOrder,
  completeOrderApi,
  useCompleteOrder,
};
