import React from "react";
import {
  sendNewMessageActionCreator,
  updateNewMessageActionCreator,
} from "../../redux/dialogs-reducer.js";
import Dialogs from "./Dialogs.jsx";

const DialogsContainer = (props) => {
  let state = props.store.getState().dialogsPage;

  const onSendNewMessage = () => {
    props.store.dispatch(sendNewMessageActionCreator());
  };

  const onMessageChange = (text) => {
    props.store.dispatch(updateNewMessageActionCreator(text));
  };

  return (
    <Dialogs
      updateNewMessage={onMessageChange}
      sendMessage={onSendNewMessage}
	  dialogsPage={state}
    />
  );
};

export default DialogsContainer;
