import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import userPhoto from "../../../img/19298171-funny-cartoon-office-worker.jpeg";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
  if (!props.profile && !props.auth) {
    return <Preloader />;
  }
  const state = props.profile.data;

  return (
    <div className={s.descriptionBlock}>
      <img src={state.photos.large || userPhoto} alt="img" className={s.img} />
      <ProfileStatus status={"Готов работать"}/>
      <div className={s.text}>
        <div className={s.fullName}>{state.fullName}</div>
        <div className={s.fullName}>{`vk: ${state.contacts.vk || ""}`}</div>
        <div className={s.fullName}>{`inst: ${state.contacts.instagram ||
          ""}`}</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
