import { authAPI } from "../api/api-js";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  if (action.type === SET_USER_DATA) {
    return {
      ...state,
      ...action.data,
      isAuth: true,
    };
  }

  return state;
};

export const setAuthUserData = (userId, email, login) => {
  return {
    type: SET_USER_DATA,
    data: {
      userId,
      email,
      login,
    },
  };
};

export const getAuthUserData = () => {
  return (dispatch) => {
    authAPI.getMyHeader().then((response) => {
      if (response.data.resultCode === 0) {
        const { email, id, login } = response.data.data;
        dispatch(setAuthUserData(id, email, login));
      }
    });
  };
};

export default authReducer;
