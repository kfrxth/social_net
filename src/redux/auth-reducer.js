import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

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
      ...action.payload,
    };
  }

  return state;
};

export const setAuthUserData = (userId, email, login, isAuth) => {
  return {
    type: SET_USER_DATA,
    payload: {
      userId,
      email,
      login,
	  isAuth,
    },
  };
};

export const getAuthUserData = () => {
  return (dispatch) => {
    return authAPI.getMyHeader().then((response) => {
      if (response.data.resultCode === 0) {
        const { id, login, email } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
      }
    });
  };
};

export const login = (email, password, rememberMe) => {
  return (dispatch) => {
    authAPI.login(email, password, rememberMe).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
      } else {
		let message = response.data.messages.length > 0 ? response.data.messages[0] : "Произошла какая-то ошибка"
		let action = stopSubmit("login", {_error: `${message}`});
		dispatch(action);
	  }
    });
  };
};

export const logout = () => {
	return (dispatch) => {
	  authAPI.logout().then((response) => {
		if (response.data.resultCode === 0) {
		  dispatch(setAuthUserData(null, null, null, false))
		}
	  });
	};
  };

export default authReducer;
