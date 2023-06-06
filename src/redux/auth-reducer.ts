import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = "network/auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "network/auth/GET_CAPTCHA_URL_SUCCESS";

type stateType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isFetching: boolean;
  isAuth: boolean;
  captchaUrl?: any;
};

type actionType = {
  type: typeof SET_USER_DATA | typeof GET_CAPTCHA_URL_SUCCESS;
  payload?: {
    userId: stateType["userId"];
    email: stateType["email"];
    login: stateType["login"];
    isAuth: stateType["isAuth"];
    captchaUrl: stateType["captchaUrl"];
  } | null;
};

type SetAuthUserDataPayloadType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean | null;
};

type SetAuthUserDataType = {
  type: typeof SET_USER_DATA;
  payload: SetAuthUserDataPayloadType;
};

type GetCaptchaUrlSuccessType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS;
  payload: { captchaUrl: string };
};

let initialState: stateType = {
  userId: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action: actionType): stateType => {
  if (action.type === SET_USER_DATA || GET_CAPTCHA_URL_SUCCESS) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return state;
};

export const setAuthUserData = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetAuthUserDataType => {
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

export const getCaptchaUrlSuccess = (
  captchaUrl: string
): GetCaptchaUrlSuccessType => {
  return {
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {
      captchaUrl,
    },
  };
};

export const getAuthUserData = () => {
  return async (dispatch: any) => {
    let response = await authAPI.getMyHeader();

    if (response.data.resultCode === 0) {
      const { id, login, email } = response.data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  };
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: any
) => {
  return async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);

    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData());
    } else {
      if (response.data.resultCode === 10) {
        dispatch(getCaptchaUrl());
      }
      let message =
        response.data.messages.length > 0
          ? response.data.messages[0]
          : "Произошла какая-то ошибка";
      let action = stopSubmit("login", { _error: `${message}` });
      dispatch(action);
    }
  };
};

export const getCaptchaUrl = () => {
  return async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
  };
};

export const logout = () => {
  return async (dispatch: any) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  };
};

export default authReducer;
