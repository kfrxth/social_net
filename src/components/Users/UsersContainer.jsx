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

class UsersContainer extends React.Component {
  onPageChanged = (page) => {
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
            toggleFollowingProgress={this.props.toggleFollowingProgress}
            followingInProgress={this.props.followingInProgress}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: getUsersSelect(state),
    pageSize: getPageSizeSelect(state),
    totalUsersCount: getTotalUsersCountSelect(state),
    currentPage: getCurrentPageSelect(state),
    isFetching: getIsFetchingSelect(state),
    followingInProgress: getFollowingInProgressSelect(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowingProgress,
    getUsers,
  })
)(UsersContainer);
