import React, { useState } from "react";
import Preloader from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import userPhoto from "../../../img/19298171-funny-cartoon-office-worker.jpeg";
import ProfileStatus from "./ProfileStatus";
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm";
import { ProfileType } from "../..//types/types";

type PropsType = {
  profile: ProfileType;
  status: string;
  isOwner: boolean;
  auth: Object;
  savePhoto: (e: Event) => void;
  updateStatus: (text: string) => string;
  saveProfile: ({}: Object) => Promise<void>;
  goToEditMode: () => void;
};

type ProfileDataType = {
  profile: ProfileType;
  isOwner: boolean;
  goToEditMode: () => void;
};

type ContactType = {
  contactTitle: string;
  contactValue: string | null;
};

const ProfileInfo = (props: PropsType) => {
  let [editMode, setEditMode] = useState(false);

  if (!props.profile && !props.auth) {
    return <Preloader />;
  }
  const state = props.profile;

  const onMainPhotoSelected = (e: any) => {
    if (e.target.files[0]) {
      props.savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData: {}) => {
    props.saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div className={s.descriptionBlock}>
      <input
        src={state.data.photos.large || userPhoto}
        alt="img"
        className={s.img}
        type={"image"}
      />

      {props.isOwner && (
        <input type={"file"} onChange={onMainPhotoSelected}></input>
      )}
      <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
      {editMode ? (
        <ProfileDataForm
          initialValues={state}
          //@ts-ignore
          profile={props.profile}
          onSubmit={onSubmit}
        />
      ) : (
        <ProfileData
          profile={props.profile}
          isOwner={props.isOwner}
          goToEditMode={() => setEditMode(true)}
        />
      )}
    </div>
  );
};

const Contact = ({ contactTitle, contactValue }: ContactType) => {
  return <>{contactValue}</> ? (
    <div className={s.contact}>
      <b>{contactTitle}</b>:{contactValue}
    </div>
  ) : (
    <></>
  );
};

const ProfileData = ({ profile, isOwner, goToEditMode }: ProfileDataType) => {
  return (
    <>
      {isOwner && <button onClick={goToEditMode}>Изменить данные</button>}
      <div className={s.text}>
        <div className={s.fullName}>
          <b>Мое имя</b>: {profile.data.fullName}
        </div>
        <div className={s.fullName}>
          <b>Ищу работу</b>: {profile.data.lookingForAJob ? "Да" : "Нет"}
        </div>
        {profile.data.lookingForAJob && (
          <div className={s.fullName}>
            <b>Мои навыки</b>: {profile.data.lookingForAJobDescription}
          </div>
        )}
        <div className={s.fullName}>
          <b>Обо мне</b>: {profile.data.aboutMe}
        </div>
        {
          <div className={s.fullName}>
            {Object.keys(profile.data.contacts as any).map((key) => {
              return (
                <Contact
                  key={key}
                  contactTitle={key}
                  contactValue={profile.data.contacts[key]}
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
