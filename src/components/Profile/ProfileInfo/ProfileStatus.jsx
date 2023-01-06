import React, { useState } from "react";
import s from "./ProfileInfo.module.css";

const ProfileStatus = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  /* componentDidUpdate(prevProps) {
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }
  } */

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
