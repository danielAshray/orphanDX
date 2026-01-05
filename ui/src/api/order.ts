import { Notification } from "@/components";
import api from "@/config/axios.config";
import { getErrorMessage } from "@/lib/utils";
import type { ApiReponse, completeOrderProps, ManualOrderType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const simulateOrderApi = async ({
  recomendationIds,
}: {
  recomendationIds: string[];
}): Promise<ApiReponse> => {
  const { data } = await api.post<ApiReponse>(`/order/simulate-order`, {
    recomendationIds,
  });

  return data;
};

const createOrderApi = async ({
  recomendationIds,
}: {
  recomendationIds: string[];
}): Promise<ApiReponse> => {
  const { data } = await api.post<ApiReponse>(`/order/`, {
    recomendationIds,
  });

  return data;
};

const createManualOrderApi = async (
  props: ManualOrderType
): Promise<ApiReponse> => {
  const { data } = await api.post<ApiReponse>(`/order/manual`, props);

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

const useSimulateOrder = () => {
  return useMutation({
    mutationFn: (props: { recomendationIds: string[] }) =>
      simulateOrderApi(props),
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
        toastMessage: "Operation successful",
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

const useCreateOrderManually = () => {
  return useMutation({
    mutationFn: (props: ManualOrderType) => createManualOrderApi(props),
    onSuccess: () => {
      Notification({
        toastMessage: "Order created successfully",
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
  orderTracking: "/order/order-tracking",
  upload: (id: number | string) => `/order/upload/${id}`,
  markComplete: (id: number | string) => `/order/complete/${id}`,
});

const fetchDashboardApi = async (): Promise<ApiReponse> => {
  const response = await api.get(OrderRoutes.dashboard);
  return response.data;
};

const fetchOrderListApi = async (): Promise<ApiReponse> => {
  const response = await api.get(OrderRoutes.track);
  return response.data;
};

const fetchOrderTrackingListApi = async (): Promise<ApiReponse> => {
  const response = await api.get(OrderRoutes.orderTracking);
  return response.data;
};

interface UploadPDFProps {
  orderId: string;
  file: File;
}

const uploadPDFApi = async ({
  orderId,
  file,
}: UploadPDFProps): Promise<ApiReponse> => {
  const formData = new FormData();
  formData.append("pdf", file);

  const { data } = await api.put<ApiReponse>(
    OrderRoutes.upload(orderId),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

const useUploadPDF = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadPDFApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetchOrderListApi"],
      });
      Notification({
        toastMessage: "PDF uploaded successfully",
        toastStatus: "success",
      });
    },
    onError: (error: any) => {
      Notification({
        toastMessage: getErrorMessage(error),
        toastStatus: "error",
      });
    },
  });
};

interface TestCompleteProps {
  orderId: string;
}

const testCompleteApi = async ({
  orderId,
}: TestCompleteProps): Promise<ApiReponse> => {
  const { data } = await api.put<ApiReponse>(OrderRoutes.markComplete(orderId));

  return data;
};

const useTestComplete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: testCompleteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetchOrderListApi"],
      });
      queryClient.invalidateQueries({ queryKey: ["fetchDashboardApi"] });
      Notification({
        toastMessage: "Marked completed successfully",
        toastStatus: "success",
      });
    },
    onError: (error: any) => {
      Notification({
        toastMessage: getErrorMessage(error),
        toastStatus: "error",
      });
    },
  });
};

export {
  fetchDashboardApi,
  fetchOrderListApi,
  fetchOrderTrackingListApi,
  useSimulateOrder,
  useCreateOrder,
  completeOrderApi,
  useCompleteOrder,
  useUploadPDF,
  useTestComplete,
  useCreateOrderManually,
};
