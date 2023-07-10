import { profileAPI } from "./../api/profile-api";
import { PhotosType, ProfileDataType } from "../components/types/types";

const ADD_POST = "ADD-POST";
const PUT_LIKE_ON_POST = "PUT_LIKE_ON_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

type PostType = {
  id: number;
  message: string;
  likes: number;
  isLiked: boolean;
};

let initialState = {
  posts: [
    {
      id: 1,
      message: "Hi, you are",
      likes: 10,
      isLiked: false,
    },
    {
      id: 2,
      message: "its me yees",
      likes: 15,
      isLiked: false,
    },
  ] as Array<PostType>,
  profile: null as ProfileDataType | null,
  status: "",
};

export type InitialStateType = typeof initialState;

const profileReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  if (action.type === ADD_POST) {
    if (action.newPostBody) {
      let newPost = {
        id: 5,
        message: action.newPostBody,
        likes: 0,
        isLiked: false,
      };

      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    }
  }
  if (action.type === SET_USER_PROFILE) {
    return { ...state, profile: action.profile };
  }
  if (action.type === SET_STATUS) {
    return { ...state, status: action.status };
  }
  if (action.type === SAVE_PHOTO_SUCCESS) {
    return {
      ...state,
      profile: { ...state.profile, photos: action.photos } as ProfileDataType,
    };
  }
  if (action.type === PUT_LIKE_ON_POST) {
    return {
      ...state,
      posts: state.posts.map((p) => {
        if (p.id === action.postId) {
          if (p.isLiked === false) {
            return { ...p, likes: p.likes + 1, isLiked: true };
          } else {
            return { ...p, likes: p.likes - 1, isLiked: false };
          }
        }
        return p;
      }),
    };
  }

  return state;
};

type AddPostActionCreatorType = {
  type: typeof ADD_POST;
  newPostBody: string;
};

export const addPostActionCreator = (
  newPostBody: string
): AddPostActionCreatorType => {
  return {
    type: ADD_POST,
    newPostBody,
  };
};

type PutLikeOnPostType = {
  type: typeof PUT_LIKE_ON_POST;
  postId: string;
};

export const putLikeOnPost = (post: string): PutLikeOnPostType => {
  return {
    type: PUT_LIKE_ON_POST,
    postId: post,
  };
};

type SetUserProfileType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileDataType;
};

export const setUserProfile = (
  profile: ProfileDataType
): SetUserProfileType => {
  return {
    type: SET_USER_PROFILE,
    profile,
  };
};

type SetStatusType = {
  type: typeof SET_STATUS;
  status: string;
};

export const setStatus = (status: string): SetStatusType => {
  return {
    type: SET_STATUS,
    status,
  };
};

type SavePhotoSuccessType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photo: PhotosType;
};

export const savePhotoSuccess = (photo: PhotosType): SavePhotoSuccessType => {
  return {
    type: SAVE_PHOTO_SUCCESS,
    photo,
  };
};

export const getStatus = (userId: number) => {
  return async (dispatch: any) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(setStatus(data));
  };
};

export const updateStatus = (status: string) => {
  return async (dispatch: any) => {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  };
};

export const getUserProfile = (userId: number) => {
  return async (dispatch: any) => {
    let data = await profileAPI.getUserProfile(userId);
    dispatch(setUserProfile(data as any));
  };
};

export const savePhoto = (file: any) => {
  return async (dispatch: any) => {
    let data = await profileAPI.savePhoto(file);

    if (data.resultCode === 0) {
      dispatch(savePhotoSuccess(data.data.photos));
    }
    console.log(data);
  };
};

export const saveProfile = (profile: ProfileDataType) => {
  return async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
      dispatch(getUserProfile(userId));
    }
  };
};

export default profileReducer;
