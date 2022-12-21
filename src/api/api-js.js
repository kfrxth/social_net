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
    return await instance.get(`profile/${id}`);
  },

  async getMyHeader() {
    return instance.get(`/auth/me`);
  },

  async followToUser(id) {
    return instance.post(`follow/${id}`);
  },

  async unfollowToUser(id) {
    return instance.delete(`follow/${id}`);
  },
};
