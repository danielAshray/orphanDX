import { Notification } from "@/components";
import api from "@/config/axios.config";
import { getErrorMessage } from "@/lib/utils";
import type { ApiReponse } from "@/types";
import { useMutation } from "@tanstack/react-query";

const createOrderApi = async ({
  recomendationId,
}: {
  recomendationId: string;
}): Promise<ApiReponse> => {
  const { data } = await api.post<ApiReponse>(`/order/${recomendationId}`);

  return data;
};

const useCreateOrder = () => {
  return useMutation({
    mutationFn: (props: { recomendationId: string }) => createOrderApi(props),
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

export { createOrderApi, useCreateOrder };
