import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import {
  getUserProfile,
  getStatus,
  updateStatus,
  savePhoto,
  saveProfile
} from "../../redux/profile-reducer";
import withRouter from "../common/withRouter";
import { withAuthRedirect } from "../../hoc/AuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component {
  refreshProfile() {
    let userId = this.props.router.params.userId;

    if (!userId) {
      userId = this.props.authorizedUserId;
    }

    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps) {
    if (this.props.router.params.userId !== prevProps.router.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <div>
        <Profile
          savePhoto={this.props.savePhoto}
          isOwner={!this.props.router.params.userId}
          {...this.props}
          profile={this.props.profile}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
  status: state.profilePage.status,
});

export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
