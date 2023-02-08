import { usersAPI } from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
  users: [],
  pageSize: 4,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
  if (action.type === FOLLOW) {
    return {
      ...state,
      users: state.users.map((u) => {
        if (u.id === action.userId) {
          return { ...u, followed: true };
        }
        return u;
      }),
    };
  }
  if (action.type === UNFOLLOW) {
    return {
      ...state,
      users: state.users.map((u) => {
        if (u.id === action.userId) {
          return { ...u, followed: false };
        }
        return u;
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

export const followSuccess = (user) => {
  return {
    type: FOLLOW,
    userId: user,
  };
};

export const unfollowSuccess = (user) => {
  return {
    type: UNFOLLOW,
    userId: user,
  };
};

export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users: users,
  };
};

export const setCurrentPage = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage,
  };
};

export const setTotalUsersCountPage = (totalUsersCount) => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount,
  };
};

export const toggleIsFetching = (isFetching) => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching,
  };
};

export const toggleFollowingProgress = (isFetching, userId) => {
  return {
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId,
  };
};

export const getUsers = (page, pageSize) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));

    let data = await usersAPI.getUsers(page, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCountPage(data.totalCount));
  };
};

export const follow = (id) => {
  return async (dispatch) => {
    dispatch(toggleFollowingProgress(true, id));
    let response = await usersAPI.followToUser(id);

    if (response.data.resultCode === 0) {
      dispatch(followSuccess(id));
    }
    dispatch(toggleFollowingProgress(false, id));
  };
};

export const unfollow = (id) => {
  return async (dispatch) => {
    dispatch(toggleFollowingProgress(true, id));
    let response = await usersAPI.unfollowToUser(id);
	
    if (response.data.resultCode === 0) {
      dispatch(unfollowSuccess(id));
    }
    dispatch(toggleFollowingProgress(false, id));
  };
};

export default usersReducer;
