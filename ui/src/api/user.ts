import api from "@/config/axios.config";
import type { LoginProps } from "@/pages/auth/login";

const UserRoutes = Object.freeze({
  login: "/user/login",
  profile: "/user/profile",
});

export interface LoginResponse {
  status: boolean;
  user: any;
}

export const loginUserApi = async ({
  email,
  password,
}: LoginProps): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>(`${UserRoutes.login}`, {
    email,
    password,
  });

  return data;
};

export const getProfileApi = async () => {
  const response = await api
    .get(`${UserRoutes.profile}`)
    .then((res) => res.data);

  return response;
};
