import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const PUT_LIKE_ON_POST = "PUT_LIKE_ON_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

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

export const getStatus = (userId) => {
  return (dispatch) => {
    profileAPI.getStatus(userId).then((response) => {
      dispatch(setStatus(response.data));
    });
  };
};

export const updateStatus = (status) => {
  return (dispatch) => {
    profileAPI.updateStatus(status).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
      }
    });
  };
};

export const getUserProfile = (userId) => {
  return (dispatch) => {
    usersAPI.getUserProfile(userId).then((data) => {
      dispatch(setUserProfile(data));
    });
  };
};

export default profileReducer;
