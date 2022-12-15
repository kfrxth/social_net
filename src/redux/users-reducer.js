const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
  users: [],
  pageSize: 4,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
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
  if (action.type === TOGGLE_IS_FETCHING) {
    return { ...state,  isFetching: action.isFetching};
  }

  return state;
};

export const follow = (user) => {
  return {
    type: FOLLOW,
    userId: user,
  };
};

export const unfollow = (user) => {
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



export default usersReducer;
