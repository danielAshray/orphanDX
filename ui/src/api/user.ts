import api from "@/config/axios.config";
import type { LoginProps, VerificationCodeForm } from "@/pages/auth/login";
import type { ApiReponse } from "@/types";
import type { ResetPasswordForm } from "@/pages/auth/login";
const UserRoutes = Object.freeze({
  login: "/user/login",
  profile: "/user/profile",
  generateEmailVerificationCode: "/user/generate-email-verification-code",
  verifyPasswordResetCode: "/user/verify-passowrd-reset-code",
  resetPassword: "/user/reset-password",
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

const generateEmailVerificationCode = async ({
  email,
}: {
  email: string;
}): Promise<ApiReponse> => {
  const { data } = await api.post<ApiReponse>(UserRoutes.login, {
    email,
  });
  return data;
};

const verifyPasswordResetCode = async ({
  email,
  code,
}: VerificationCodeForm): Promise<ApiReponse> => {
  const { data } = await api.post<ApiReponse>(
    UserRoutes.verifyPasswordResetCode,
    {
      email,
      code,
    }
  );
  return data;
};

const resetPassword = async ({
  email,
  code,
  password,
}: ResetPasswordForm): Promise<ApiReponse> => {
  const { data } = await api.post(UserRoutes.resetPassword, {
    email,
    code,
    password,
  });
  return data;
};

const fetchProfileApi = async () => {
  const response = await api.get(UserRoutes.profile).then((res) => res.data);

  return response;
};

export {
  loginUserApi,
  fetchProfileApi,
  generateEmailVerificationCode,
  verifyPasswordResetCode,
  resetPassword,
};
