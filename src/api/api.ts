import axios from "axios";
import { ProfileDataType } from "../components/types/types";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "78530cf7-45d7-4440-9b68-39f8fa13922a",
  },
});

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10
}

type MeResponseType = {
  data: { id: number; email: string; login: string };
  resultCode: ResultCodesEnum;
  messages: Array<string>;
};

type LoginResponseType = {
  data: { userId: number };
  resultCode: ResultCodesEnum;
  messages: Array<string>;
};

export const usersAPI = {
  async getUsers(currentPage = 1, pageSize = 10) {
    const response = await instance.get(
      `users?page=${currentPage}&count=${pageSize}`
    );
    return response.data;
  },

  async getUserProfile(id: number) {
    return profileAPI.getUserProfile(id);
  },

  async followToUser(id: number) {
    return instance.post(`follow/${id}`);
  },

  async unfollowToUser(id: number) {
    return instance.delete(`follow/${id}`);
  },
};

export const profileAPI = {
  async getStatus(id: number) {
    return instance.get(`profile/status/${id}`);
  },
  async updateStatus(status: string) {
    return instance.put(`profile/status`, {
      status: status,
    });
  },
  async getUserProfile(id: number) {
    return await instance.get(`profile/${id}`);
  },
  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append("Image", photoFile);

    return instance.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  saveProfile(profile: ProfileDataType) {
    return instance.put(`profile`, profile);
  },
};

export const authAPI = {
  async getMyHeader() {
    return instance.get<MeResponseType>(`auth/me`).then((res) => res.data);
  },
  async login(
    email: string,
    password: string,
    rememberMe: boolean = false,
    captcha: string | null = null
  ) {
    return instance.post<LoginResponseType>(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    }).then(res => res.data);
  },
  async logout() {
    return instance.delete(`auth/login`);
  },
};

export const securityAPI = {
  async getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`);
  },
};
