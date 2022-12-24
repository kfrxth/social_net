import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { getUserProfile } from "../../redux/profile-reducer";
import withRouter from "../common/withRouter";
import { withAuthRedirect } from "../../hoc/AuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = this.props.auth.userId;
    }

    this.props.getUserProfile(userId);
  }

  render() {
    return (
      <div>
        <Profile
          {...this.props}
          profile={this.props.profile}
          auth={this.props.auth}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  auth: state.auth,
});

export default compose(
  connect(mapStateToProps, { getUserProfile }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
