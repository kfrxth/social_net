//import { createSelector } from "reselect";

export const getUsersSelect = (state) => {
  return state.usersPage.users;
};

export const getPageSizeSelect = (state) => {
  return state.usersPage.pageSize;
};

export const getTotalUsersCountSelect = (state) => {
  return state.usersPage.totalUsersCount;
};

export const getCurrentPageSelect = (state) => {
  return state.usersPage.currentPage;
};

export const getIsFetchingSelect = (state) => {
  return state.usersPage.isFetching;
};

export const getFollowingInProgressSelect = (state) => {
  return state.usersPage.followingInProgress;
};
