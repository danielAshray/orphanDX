import {
  loginUserApi,
  generateEmailVerificationCode,
  verifyPasswordResetCode,
  resetPassword,
} from "@/api/user";
import { Notification } from "@/components";
import { useAuthContext } from "@/context/auth";
import { getErrorMessage } from "@/lib/utils";
import type {
  LoginProps,
  VerificationCodeForm,
  ResetPasswordForm,
} from "@/pages/auth/login";
import { useMutation } from "@tanstack/react-query";
export type ActiveUserDataType = {
  token: string;
  orgRole: string;
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

export const useSendEmailVerificationCode = () => {
  return useMutation({
    mutationFn: ({ email }: { email: string }) =>
      generateEmailVerificationCode({ email }),

    onSuccess: (data: any) =>
      Notification({
        toastMessage: "Password reset email successfully sent",
        toastStatus: "success",
      }),
    onError: (error: any) =>
      Notification({
        toastMessage: getErrorMessage(error),
        toastStatus: "error",
      }),
  });
};

export const useVerifyPasswordResetCode = () =>
  useMutation({
    mutationFn: ({ email, code }: VerificationCodeForm) =>
      verifyPasswordResetCode({ email, code }),
    onSuccess: () =>
      Notification({
        toastMessage: "Password Reset code successfully verified",
        toastStatus: "success",
      }),
    onError: (error: any) =>
      Notification({
        toastMessage: getErrorMessage(error),
        toastStatus: "error",
      }),
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: ({
      email,
      password,
      code,
    }: {
      email: string;
      password: string;
      code: string;
    }) => resetPassword({ email, password, code }),
    onSuccess: () =>
      Notification({
        toastMessage: "Password successfully reset",
        toastStatus: "success",
      }),
    onError: (error: any) =>
      Notification({
        toastMessage: getErrorMessage(error),
        toastStatus: "error",
      }),
  });
