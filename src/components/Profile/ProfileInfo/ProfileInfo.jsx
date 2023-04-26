import React, { useState } from "react";
import Preloader from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import userPhoto from "../../../img/19298171-funny-cartoon-office-worker.jpeg";
import ProfileStatus from "./ProfileStatus";
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm";

const ProfileInfo = (props) => {
  let [editMode, setEditMode] = useState(false);

  if (!props.profile && !props.auth) {
    return <Preloader />;
  }
  const state = props.profile.data;

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData) => {
	props.saveProfile(formData);
	//setEditMode(false);
  }

  return (
    <div className={s.descriptionBlock}>
      <input
        src={state.photos.large || userPhoto}
        alt="img"
        className={s.img}
        type={"image"}
      />

      {props.isOwner && (
        <input type={"file"} onChange={onMainPhotoSelected}></input>
      )}
      <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
      {editMode ? (
        <ProfileDataForm initialValues={state} profile={props.profile} onSubmit={onSubmit}/>
      ) : (
        <ProfileData
          profile={state}
          isOwner={props.isOwner}
          goToEditMode={() => setEditMode(true)}
        />
      )}
    </div>
  );
};

const Contact = ({ contactTitle, contactValue }) => {
  return contactValue ? (
    <div className={s.contact}>
      <b>{contactTitle}</b>:{contactValue}
    </div>
  ) : (
    ""
  );
};

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    <>
      {isOwner && <button onClick={goToEditMode}>edit</button>}
      <div className={s.text}>
        <div className={s.fullName}>
          <b>Мое имя</b>: {profile.fullName}
        </div>
        <div className={s.fullName}>
          <b>Ищу работу</b>: {profile.lookingForAJob ? "Да" : "Нет"}
        </div>
        {profile.lookingForAJob && (
          <div className={s.fullName}>
            <b>Мои навыки</b>: {profile.lookingForAJobDescription}
          </div>
        )}
        <div className={s.fullName}>
          <b>Обо мне</b>: {profile.aboutMe}
        </div>
        {
          <div className={s.fullName}>
            {Object.keys(profile.contacts).map((key) => {
              return (
                <Contact
                  key={key}
                  contactTitle={key}
                  contactValue={profile.contacts[key]}
                />
              );
            })}
          </div>
        }
      </div>
    </>
  );
};

export default ProfileInfo;
