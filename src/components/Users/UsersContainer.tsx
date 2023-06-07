import { connect } from "react-redux";
import {
  follow,
  setCurrentPage,
  unfollow,
  toggleFollowingProgress,
  getUsers,
} from "../../redux/users-reducer";
import Users from "./Users";
import React from "react";
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import {
  getCurrentPageSelect,
  getFollowingInProgressSelect,
  getIsFetchingSelect,
  getPageSizeSelect,
  getTotalUsersCountSelect,
  getUsersSelect,
} from "../../redux/users-selectors";
import { UserType } from "../types/types";
import { AppStateType } from "../../redux/redux-store";

type PropsTypes = {
  currentPage: number;
  pageSize: number;
  isFetching: boolean;
  totalUsersCount: number;
  users: Array<UserType>;
  followingInProgress: Array<number>;

  follow: () => void;
  unfollow: () => void;
  setCurrentPage: (page: number) => any;
  getUsers: (page: number, pageSize: number) => Array<number>;
};

class UsersContainer extends React.Component<PropsTypes> {
  onPageChanged = (page: number) => {
    this.props.setCurrentPage(page);
    this.props.getUsers(page, this.props.pageSize);
  };

  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  render() {
    return (
      <>
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            unfollow={this.props.unfollow}
            follow={this.props.follow}
            followingInProgress={this.props.followingInProgress}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    users: getUsersSelect(state),
    pageSize: getPageSizeSelect(state),
    totalUsersCount: getTotalUsersCountSelect(state),
    currentPage: getCurrentPageSelect(state),
    isFetching: getIsFetchingSelect(state),
    followingInProgress: getFollowingInProgressSelect(state),
  };
};

export default compose<React.Component<PropsTypes>>(
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowingProgress,
    getUsers,
  })
)(UsersContainer);
