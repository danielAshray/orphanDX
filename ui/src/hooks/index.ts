import { loginUserApi } from "@/api/user";
import { Notification } from "@/components";
import { useAuthContext } from "@/context/auth";
import { getErrorMessage } from "@/lib/utils";
import type { LoginProps } from "@/pages/auth/login";
import { useMutation } from "@tanstack/react-query";

export type ActiveUserDataType = {
  token: string;
  // role: string;
  // orgRole: string;
  user: any;
};

export const useLoginUser = () => {
  const { login } = useAuthContext();

  return useMutation({
    mutationFn: (props: LoginProps) => loginUserApi(props),

    onSuccess: (data: { data: ActiveUserDataType }) => {
      login(data.data);

      Notification({
        toastMessage: "User login successfully",
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
