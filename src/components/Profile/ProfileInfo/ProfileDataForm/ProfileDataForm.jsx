import React from "react";
import { reduxForm } from "redux-form";
import {
  createField,
  Input,
  Textarea,
} from "../../../common/FormControls/FormControls";
import s from ".././ProfileInfo.module.css";
import styles from "../../../common/FormControls/FormControls.module.css";

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <button>save</button>
	  {error && <div className={styles.formSummaryError}>{error}</div>}
      <div>
        <div>
          <b>Мое имя</b>: {createField("Полное имя", "fullName", [], Input)}
        </div>
        <div>
          <b>Ищу работу</b>:
          {createField("", "lookingForAJob", [], Input, "checkbox")}
        </div>
        <div>
          <b>Мои навыки</b>:
          {createField(
            "Профессиональные навыки",
            "lookingForAJobDescription",
            [],
            Textarea
          )}
        </div>
        <div>
          <b>Обо мне</b>:{createField("я хорош", "aboutMe", [], Textarea)}
        </div>
         <div>
          <b>Контакты</b>:
          {Object.keys(profile.data.contacts).map((key) => {
            return (
              <div key={key} className={s.contact}>
                <b>
                  {key}: {createField("" + key, "contacts." + key, [], Input)}
                </b>
              </div>
            );
          })}
        </div> 
      </div>
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm({ form: "edit-profile" })(
  ProfileDataForm
);

export default ProfileDataFormReduxForm;
