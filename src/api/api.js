import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "78530cf7-45d7-4440-9b68-39f8fa13922a",
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
    return profileAPI.getUserProfile(id);
  },

  async followToUser(id) {
    return instance.post(`follow/${id}`);
  },

  async unfollowToUser(id) {
    return instance.delete(`follow/${id}`);
  },
};

export const profileAPI = {
  async getStatus(id) {
    return instance.get(`profile/status/${id}`);
  },
  async updateStatus(status) {
    return instance.put(`profile/status`, {
      status: status,
    });
  },
  async getUserProfile(id) {
    return await instance.get(`profile/${id}`);
  },
  savePhoto(photoFile) {
    const formData = new FormData();
    formData.append("Image", photoFile);

    return instance.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  saveProfile(profile) {
	return instance.put(`profile`, profile);
  }
};

export const authAPI = {
  async getMyHeader() {
    return instance.get(`auth/me`);
  },
  async login(email, password, rememberMe = false, captcha = null) {
    return instance.post(`auth/login`, { email, password, rememberMe, captcha });
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
