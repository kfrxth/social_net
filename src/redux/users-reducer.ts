import { Dispatch } from "redux";
import { UserType } from "../components/types/types";
import { updateObjectInArray } from "../utils/object-helpers/object-helper";
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { usersAPI } from "../api/users-api";

type DispatchType = Dispatch<ActionsTypes>;

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 4,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
};

type InitialStateType = typeof initialState;

type ThunkType = BaseThunkType<ActionsTypes>

type ActionsTypes = InferActionsTypes<typeof actions>;

const usersReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  if (action.type === "FOLLOW") {
    return {
      ...state,
      users: updateObjectInArray(state.users, action.userId, "id", {
        followed: true,
      }),
    };
  }
  if (action.type === "UNFOLLOW") {
    return {
      ...state,
      users: updateObjectInArray(state.users, action.userId, "id", {
        followed: false,
      }),
    };
  }
  if (action.type === "SET_USERS") {
    return { ...state, users: action.users };
  }
  if (action.type === "SET_CURRENT_PAGE") {
    return { ...state, currentPage: action.currentPage };
  }
  if (action.type === "SET_TOTAL_USERS_COUNT") {
    return { ...state, totalUsersCount: action.count };
  }
  if (action.type === "TOGGLE_IS_FETCHING") {
    return { ...state, isFetching: action.isFetching };
  }
  if (action.type === "TOGGLE_IS_FOLLOWING_PROGRESS") {
    return {
      ...state,
      followingInProgress: action.isFetching
        ? [...state.followingInProgress, action.userId]
        : state.followingInProgress.filter((id) => id !== action.userId),
    };
  }

  return state;
};

export const actions = {
  followSuccess: (user: number) => {
    return {
      type: "FOLLOW",
      userId: user,
    } as const;
  },

  unfollowSuccess: (user: number) => {
    return {
      type: "UNFOLLOW",
      userId: user,
    } as const;
  },

  setUsers: (users: Array<UserType>) => {
    return {
      type: "SET_USERS",
      users: users,
    } as const;
  },

  setCurrentPage: (currentPage: number) => {
    return {
      type: "SET_CURRENT_PAGE",
      currentPage,
    } as const;
  },

  setTotalUsersCountPage: (totalUsersCount: number) => {
    return {
      type: "SET_TOTAL_USERS_COUNT",
      count: totalUsersCount,
    } as const;
  },

  toggleIsFetching: (isFetching: boolean) => {
    return {
      type: "TOGGLE_IS_FETCHING",
      isFetching,
    } as const;
  },

  toggleFollowingProgress: (isFetching: boolean, userId: number) => {
    return {
      type: "TOGGLE_IS_FOLLOWING_PROGRESS",
      isFetching,
      userId,
    } as const;
  },
};

export const getUsers = (page: number, pageSize: number): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(page));

    let data = await usersAPI.getUsers(page, pageSize);
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCountPage(data.totalCount));
  };
};

const _followUnfollowFlow = async (
  dispatch: DispatchType,
  id: number,
  apiMethod: any,
  actionCreator: (id: number) => ActionsTypes
) => {
  dispatch(actions.toggleFollowingProgress(true, id));
  let response = await apiMethod(id);

  if (response.data.resultCode === 0) {
    dispatch(actionCreator(id));
  }
  dispatch(actions.toggleFollowingProgress(false, id));
};

export const follow = (id: number): ThunkType => {
  return async (dispatch: any) => {
    _followUnfollowFlow(
      dispatch,
      id,
      usersAPI.followToUser.bind(usersAPI),
      actions.followSuccess
    );
  };
};

export const unfollow = (id: number): ThunkType => {
  return async (dispatch: any) => {
    _followUnfollowFlow(
      dispatch,
      id,
      usersAPI.unfollowToUser.bind(usersAPI),
      actions.unfollowSuccess
    );
  };
};

export default usersReducer;
