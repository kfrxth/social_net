import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
  return (
    <div>
      <div>
        <ProfileInfo />
      </div>
      <div>
        <MyPosts></MyPosts>
      </div>
    </div>
  );
};

export default Profile;
