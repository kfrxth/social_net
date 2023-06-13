import React, { useState, useEffect, ChangeEvent } from "react";
import s from "./ProfileInfo.module.css";

type PropsType = {
	status: string
	updateStatus: (status : string) => string
}

const ProfileStatus = (props : PropsType) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
	setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e : ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div className={s.status}>
      {editMode ? (
        <div>
          <input
            className={s.input}
            autoFocus={true}
            onBlur={deactivateEditMode}
            onChange={onStatusChange}
            value={status}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                deactivateEditMode();
              }
            }}
          ></input>
        </div>
      ) : (
        <div>
          <span onDoubleClick={activateEditMode}>{props.status}</span>
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;
