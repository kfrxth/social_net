import { ProfileDataType } from "../components/types/types";
import { instance } from "./api";

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
