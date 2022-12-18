import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "df67916d-84f4-4611-beb3-1bfaee86a4e6",
  },
});

export const usersAPI = {
  async getUsers(currentPage = 1, pageSize = 10) {
    const response = await instance.get(
      `users?page=${currentPage}&count=${pageSize}`
    );
    return response.data;
  },

  async getUserProfile(id) {
    const response = await instance.get(`profile/${id}`);
    return response.data;
  },

  async getMyHeader() {
    const response = instance.get(`/auth/me`);
    return response;
  },

  async followToUser(id) {
    const response = instance.post(`follow/${id}`);
    debugger;
    return response;
  },

  async unfollowToUser(id) {
    const response = instance.delete(`follow/${id}`);

    return response;
  },
};
