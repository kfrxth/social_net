import React from "react";
import profStyle from "./Profile.module.css";

const Profile = () => {
  return (
    <div className={profStyle.content}>
      <div>ава + описание</div>
      <div>
        мои посты
        <div>Новый пост</div>
      </div>
      <div className={profStyle.posts}>
        <div className={profStyle.item}>Пост 1</div>
        <div className={profStyle.item}>Пост 2</div>
      </div>
    </div>
  );
};

export default Profile;
