import React from "react";
import { reduxForm } from "redux-form";
import { createField, Input } from "../../../common/FormControls/FormControls";

const ProfileDataForm = () => {
  return (
    <form>
      <button onClick={() => ""}>save</button>
      <div>
        <div>
          <b>Мое имя</b>: {createField("Полное имя", "fullName", [], Input)}
        </div>
        <div>
          <b>Ищу работу: </b>
          {createField(null, "lookingForAJob", null, Input, "checkbox")}
        </div>
      </div>
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm({ form: "edit-profile" })(
  ProfileDataForm
);

export default ProfileDataFormReduxForm;
