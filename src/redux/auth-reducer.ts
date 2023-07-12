import { authAPI } from "./../api/auth-api";
import { stopSubmit } from "redux-form";
import { ResultCodesEnum, securityAPI } from "../api/api";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

type stateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>;

export const actions = {
  setAuthUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: "NT/auth/SET_USER_DATA",
      payload: { userId, email, login, isAuth },
    } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) =>
    ({
      type: "NT/auth/GET_CAPTCHA_URL_SUCCESS",
      payload: {
        captchaUrl,
      },
    } as const),
};

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isFetching: false,
  isAuth: false,
  captchaUrl: null as string | null,
};

const authReducer = (state = initialState, action: ActionsType): stateType => {
  if (
    action.type === "NT/auth/SET_USER_DATA" ||
    "NT/auth/GET_CAPTCHA_URL_SUCCESS"
  ) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return state;
};

export const getAuthUserData = (): ThunkType => {
  return async (dispatch) => {
    let response = await authAPI.getMyHeader();

    if (response.data.resultCode === ResultCodesEnum.Success) {
      const { id, login, email } = response.data.data;
      dispatch(actions.setAuthUserData(id, email, login, true));
    }
  };
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: any
): ThunkType => {
  return async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);

    if (response.data.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserData());
    } else {
      if (response.data.resultCode === ResultCodesEnum.CaptchaIsRequired) {
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

export const getCaptchaUrl = (): ThunkType => {
  return async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
  };
};

export const logout = (): ThunkType => {
  return async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
      dispatch(actions.setAuthUserData(null, null, null, false));
    }
  };
};

export default authReducer;
