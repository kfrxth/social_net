const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";

let initialState = {
  users: [],
  pageSize: 4,
  totalUsersCount: 0,
  currentPage: 1,
};

const usersReducer = (state = initialState, action) => {
  if (action.type === "FOLLOW") {
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
  if (action.type === "UNFOLLOW") {
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
  if (action.type === "SET_USERS") {
    return { ...state, users: action.users };
  }
  if (action.type === "SET_CURRENT_PAGE") {
    return { ...state,  currentPage: action.currentPage};
  }
  if (action.type === "SET_TOTAL_USERS_COUNT") {
    return { ...state,  totalUsersCount: action.count};
  }

  return state;
};

export const followActionCreator = (user) => {
  return {
    type: FOLLOW,
    userId: user,
  };
};

export const unfollowActionCreator = (user) => {
  return {
    type: UNFOLLOW,
    userId: user,
  };
};

export const setUsersActionCreator = (users) => {
  return {
    type: SET_USERS,
    users: users,
  };
};

export const setCurrentPageActionCreator = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage,
  };
};

export const setTotalUsersCountPageActionCreator = (totalUsersCount) => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount,
  };
};

export default usersReducer;
