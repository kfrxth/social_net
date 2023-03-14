import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const PUT_LIKE_ON_POST = "PUT_LIKE_ON_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

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
  ],
  profile: null,
  status: "",
};

const profileReducer = (state = initialState, action) => {
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
    return { ...state, profile: {...state.profile, photos: action.photos} };
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

export const addPostActionCreator = (newPostBody) => {
  return {
    type: ADD_POST,
    newPostBody,
  };
};

export const putLikeOnPost = (post) => {
  return {
    type: PUT_LIKE_ON_POST,
    postId: post,
  };
};

export const setUserProfile = (profile) => {
  return {
    type: SET_USER_PROFILE,
    profile,
  };
};

export const setStatus = (status) => {
  return {
    type: SET_STATUS,
    status,
  };
};

export const savePhotoSuccess = (photo) => {
	return {
	  type: SAVE_PHOTO_SUCCESS,
	  photo,
	};
  };

export const getStatus = (userId) => {
  return async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
  };
};

export const updateStatus = (status) => {
  return async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  };
};

export const getUserProfile = (userId) => {
  return async (dispatch) => {
    let data = await usersAPI.getUserProfile(userId);
    dispatch(setUserProfile(data));
  };
};

export const savePhoto = (file) => {
	return async (dispatch) => {
		let response = await profileAPI.savePhoto(file);

		if (response.data.resultCode === 0) {
			dispatch(savePhotoSuccess(response.data.photos));
		  }
	};
  };

export default profileReducer;
