import { getAuthUserData } from "../redux/auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

let initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  if (action.type === INITIALIZED_SUCCESS) {
    return {
      ...state,
      initialized: true,
    };
  }

  return state;
};

export const initializedSuccess = () => {
  return {
    type: INITIALIZED_SUCCESS,
  };
};

export const initializeApp = () => {
  return (dispatch) => {
    let promise = dispatch(getAuthUserData());

    promise.then(() => {
      dispatch(initializedSuccess());
    });
  };
};

export default appReducer;
