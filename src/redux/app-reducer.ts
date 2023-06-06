import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

export type actionType = {
  type: typeof INITIALIZED_SUCCESS;
};

export type InitialStateType = {
  initialized: boolean;
};

let initialState: InitialStateType = {
  initialized: false,
};

const appReducer = (
  state = initialState,
  action: actionType
): InitialStateType => {
  if (action.type === INITIALIZED_SUCCESS) {
    return {
      ...state,
      initialized: true,
    };
  }

  return state;
};

export const initializedSuccess = (): actionType => {
  return {
    type: INITIALIZED_SUCCESS,
  };
};

export const initializeApp = () => {
  return (dispatch: any) => {
    let promise = dispatch(getAuthUserData());

    promise.then(() => {
      dispatch(initializedSuccess());
    });
  };
};

export default appReducer;
