const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";

let initialState = {
  users: [],
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
    return { ...state, users: [...state.users, ...action.users] };
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

export default usersReducer;
