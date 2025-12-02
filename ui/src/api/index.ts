import Notification from "@/components/toaster";
import { config } from "@/config/env";
import { getErrorMessage } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type LoginDataType = { email: string; password: string };
const loginApi = async (props: LoginDataType) => {
  const response = await axios
    .post(`${config.BASE_URL}/user/login`, props)
    .then((res) => res.data);

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
