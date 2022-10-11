import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import profStyle from "./Profile.module.css";

const Profile = () => {
  return (
    <div className={profStyle.content}>
      <div>ава + описание</div>
	  <MyPosts />
    </div>
  );
};

export default Profile;
