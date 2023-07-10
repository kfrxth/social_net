import { PhotosType, ProfileDataType } from "./../components/types/types";
import { ResponseType, instance } from "./api";

type SavePhotoResponseDataType = {
	photos: PhotosType;
}

export const profileAPI = {
  async getStatus(id: number) {
    return instance.get<string>(`profile/status/${id}`).then((res) => res.data);
  },
  async updateStatus(status: string) {
    return instance
      .put<ResponseType>(`profile/status`, {
        status: status,
      })
      .then((res) => res.data);
  },
  async getUserProfile<ProfileDataType>(id: number) {
    return await instance.get(`profile/${id}`);
  },
  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append("Image", photoFile);

    return instance
      .put<ResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  },
  saveProfile(profile: ProfileDataType) {
    return instance.put(`profile`, profile);
  },
};
