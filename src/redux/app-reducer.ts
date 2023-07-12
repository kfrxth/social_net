import { getAuthUserData } from "./auth-reducer";
import { InferActionsTypes } from "./redux-store";

export type InitialStateType = typeof initialState;

let initialState = {
  initialized: false,
};

export const actions = {
  initializedSuccess: () => ({ type: "NT/APP/INITIALIZED_SUCCESS" } as const),
};

type ActionsType = InferActionsTypes<typeof actions>;

const appReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  if (action.type === "NT/APP/INITIALIZED_SUCCESS") {
    return {
      ...state,
      initialized: true,
    };
  }

  return state;
};

export const initializeApp = () => {
  return (dispatch: any) => {
    let promise = dispatch(getAuthUserData());

    promise.then(() => {
      dispatch(actions.initializedSuccess());
    });
  };
};

export default appReducer;
