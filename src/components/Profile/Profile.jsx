import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/AuthRedirect";

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo
        savePhoto={props.savePhoto}
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
		saveProfile={props.saveProfile}
      />
      <MyPostsContainer />
    </div>
  );
};

export default compose(withAuthRedirect)(Profile);
