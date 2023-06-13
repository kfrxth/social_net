import { Dispatch } from "redux";
import { usersAPI } from "../api/api";
import { UserType } from "../components/types/types";
import { updateObjectInArray } from "../utils/object-helpers/object-helper";
import { AppStateType } from "./redux-store";
import { ThunkAction } from "redux-thunk";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

type ActionsTypes =
  | FollowSuccessType
  | UnfollowSuccessType
  | SetUsersType
  | SetCurrentPageType
  | SetTotalUsersCountPageType
  | ToggleIsFetchingType
  | ToggleFollowingProgressType;

type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 4,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
};

type InitialStateType = typeof initialState;

type FollowSuccessType = {
  type: typeof FOLLOW;
  userId: number;
};

type UnfollowSuccessType = {
  type: typeof UNFOLLOW;
  userId: number;
};

type SetUsersType = {
  type: typeof SET_USERS;
  users: Array<UserType>;
};

type SetCurrentPageType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};

type SetTotalUsersCountPageType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  count: number;
};

type ToggleIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};

type ToggleFollowingProgressType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userId: number;
};

const usersReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  if (action.type === FOLLOW) {
    return {
      ...state,
      users: updateObjectInArray(state.users, action.userId, "id", {
        followed: true,
      }),
    };
  }
  if (action.type === UNFOLLOW) {
    return {
      ...state,
      users: updateObjectInArray(state.users, action.userId, "id", {
        followed: false,
      }),
    };
  }
  if (action.type === SET_USERS) {
    return { ...state, users: action.users };
  }
  if (action.type === SET_CURRENT_PAGE) {
    return { ...state, currentPage: action.currentPage };
  }
  if (action.type === SET_TOTAL_USERS_COUNT) {
    return { ...state, totalUsersCount: action.count };
  }
  if (action.type === TOGGLE_IS_FETCHING) {
    return { ...state, isFetching: action.isFetching };
  }
  if (action.type === TOGGLE_IS_FOLLOWING_PROGRESS) {
    return {
      ...state,
      followingInProgress: action.isFetching
        ? [...state.followingInProgress, action.userId]
        : state.followingInProgress.filter((id) => id !== action.userId),
    };
  }

  return state;
};

export const followSuccess = (user: number): FollowSuccessType => {
  return {
    type: FOLLOW,
    userId: user,
  };
};

export const unfollowSuccess = (user: number): UnfollowSuccessType => {
  return {
    type: UNFOLLOW,
    userId: user,
  };
};

export const setUsers = (users: Array<UserType>): SetUsersType => {
  return {
    type: SET_USERS,
    users: users,
  };
};

export const setCurrentPage = (currentPage: number): SetCurrentPageType => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage,
  };
};

export const setTotalUsersCountPage = (
  totalUsersCount: number
): SetTotalUsersCountPageType => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount,
  };
};

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching,
  };
};

export const toggleFollowingProgress = (
  isFetching: boolean,
  userId: number
): ToggleFollowingProgressType => {
  return {
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId,
  };
};

export const getUsers = (page: number, pageSize: number): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));

    let data = await usersAPI.getUsers(page, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCountPage(data.totalCount));
  };
};

const _followUnfollowFlow = async (
  dispatch: DispatchType,
  id: number,
  apiMethod: any,
  actionCreator: (id: number) => FollowSuccessType | UnfollowSuccessType
) => {
  dispatch(toggleFollowingProgress(true, id));
  let response = await apiMethod(id);

  if (response.data.resultCode === 0) {
    dispatch(actionCreator(id));
  }
  dispatch(toggleFollowingProgress(false, id));
};

export const follow = (id: number): ThunkType => {
  return async (dispatch: any) => {
    _followUnfollowFlow(
      dispatch,
      id,
      usersAPI.followToUser.bind(usersAPI),
      followSuccess
    );
  };
};

export const unfollow = (id: number): ThunkType => {
  return async (dispatch: any) => {
    _followUnfollowFlow(
      dispatch,
      id,
      usersAPI.unfollowToUser.bind(usersAPI),
      unfollowSuccess
    );
  };
};

export default usersReducer;
