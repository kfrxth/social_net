import axios from "axios";
import { UserType } from "../components/types/types";

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
	data: D;
	resultCode: RC;
	messages: Array<string>;
  };

export type GetItemsType = {
	items: Array<UserType>
	totalCount: number
	error: string | null
}

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "78530cf7-45d7-4440-9b68-39f8fa13922a",
  },
});

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10,
}

export const securityAPI = {
  async getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`);
  },
};
