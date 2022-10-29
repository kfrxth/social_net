import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Dialogs.module.css";

const DialogItem = (props) => {
  const path = `/dialogs/${props.id}`;

  return (
    <div className={s.dialog + " " + s.active}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
};

const Message = (props) => {
  return <div className={s.dialog}>{props.message}</div>;
};

const Dialogs = (props) => {
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        <DialogItem name="Andrey" id="1"></DialogItem>
        <DialogItem name="Aleksey" id="2"></DialogItem>
        <DialogItem name="Victor" id="3"></DialogItem>
        <DialogItem name="Matvey" id="4"></DialogItem>
        <DialogItem name="Valentin" id="5"></DialogItem>
      </div>
      <div className={s.messages}>
        <Message message="Hi"></Message>
        <Message message="WHATSUP"></Message>
        <Message message="YO"></Message>
      </div>
    </div>
  );
};

export default Dialogs;
