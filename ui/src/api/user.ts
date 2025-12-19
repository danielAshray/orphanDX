import api from "@/config/axios.config";
import type { LoginProps } from "@/pages/auth/login";
import type { ApiReponse } from "@/types";

const UserRoutes = Object.freeze({
  login: "/auth/login",
  profile: "/user/profile",
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

export { loginUserApi, fetchProfileApi };
