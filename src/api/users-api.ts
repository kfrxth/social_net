import { GetItemsType, ResponseType, instance } from "./api";

export const usersAPI = {
  async getUsers(currentPage = 1, pageSize = 10) {
    const response = await instance.get<GetItemsType>(
      `users?page=${currentPage}&count=${pageSize}`
    );
    return response.data;
  },

  async followToUser(id: number) {
    return instance.post(`follow/${id}`);
  },

  async unfollowToUser(id: number) {
    return instance.delete(`follow/${id}`);
  },
};
