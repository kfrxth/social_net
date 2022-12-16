import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import userPhoto from "../../../img/19298171-funny-cartoon-office-worker.jpeg";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div className={s.descriptionBlock}>
      <img src={props.profile.photos.large || userPhoto } alt="img" className={s.img} />
      <div className={s.text}>
        <div className={s.fullName}>{props.profile.fullName}</div>
        <div className={s.fullName}>{`vk: ${props.profile.contacts.vk}`}</div>
        <div
          className={s.fullName}
        >{`inst: ${props.profile.contacts.instagram}`}</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
