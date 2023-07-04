import { ResponseType, instance } from "./api";

type MeResponseDataType = {
  id: number;
  email: string;
  login: string;
};

type LoginResponseDataType = {
  data: { userId: number };
};

export const authAPI = {
  async getMyHeader() {
    return instance
      .get<ResponseType<MeResponseDataType>>(`auth/me`);
  },
  async login(
    email: string,
    password: string,
    rememberMe: boolean = false,
    captcha: string | null = null
  ) {
    return instance
      .post<ResponseType<LoginResponseDataType>>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      });
  },
  async logout() {
    return instance.delete(`auth/login`);
  },
};
