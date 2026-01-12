import api from "@/config/axios.config";
import type { LoginProps } from "@/pages/auth/login";
import type { ApiReponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { Notification } from "@/components";
import { getErrorMessage } from "@/lib/utils";

const UserRoutes = Object.freeze({
  login: "/user/login",
  profile: "/user/profile",
  changePassword: "/user/change-password",
});

const loginUserApi = async ({
  email,
  password,
}: LoginProps): Promise<ApiReponse> => {
  const { data } = await api.post<ApiReponse>(UserRoutes.login, {
    email,
    password,
  });

  return data;
};

const fetchProfileApi = async () => {
  const response = await api.get(UserRoutes.profile).then((res) => res.data);

  return response;
};

type ChangePasswordProps = {
  oldPassword: string;
  newPassword: string;
};

const changePasswordApi = async (
  payload: ChangePasswordProps
): Promise<ApiReponse> => {
  const { data } = await api.post<ApiReponse>(
    UserRoutes.changePassword,
    payload
  );

  return data;
};

const useChangePasssword = () => {
  return useMutation({
    mutationFn: (props: ChangePasswordProps) => changePasswordApi(props),
    onSuccess: () => {
      Notification({
        toastMessage: "Password changed successfully",
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

export { loginUserApi, fetchProfileApi, useChangePasssword };
