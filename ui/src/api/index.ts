import Notification from "@/components/toaster";
import api from "@/config/axios.config";
import { getErrorMessage } from "@/utils";
import { useMutation } from "@tanstack/react-query";

type LoginDataType = { email: string; password: string };
const loginApi = async (props: LoginDataType) => {
  const response = await api.post(`/user/login`, props).then((res) => res.data);

  return response;
};

export const getProfileApi = async () => {
  const response = await api.get(`user/profile`).then((res) => res.data);

  return response;
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (props: LoginDataType) => loginApi(props),
    onSuccess: () =>
      Notification({
        toastMessage: "User updated successfully",
        toastStatus: "success",
      }),
    onError: (error: any) =>
      Notification({
        toastMessage: getErrorMessage(error),
        toastStatus: "error",
      }),
  });
};
