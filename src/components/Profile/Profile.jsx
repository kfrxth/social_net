import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileStyle from "./Profile.module.css";

const Profile = () => {
  return (
    <div className={ProfileStyle.item}>
      <div>ава + описание</div>
      <MyPosts />
    </div>
  );
};

export default Profile;
