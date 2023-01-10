import React from "react";
import DialogItem from "./DialogItem/DialogItem.jsx";
import Message from "./Message/Message";
import s from "./Dialogs.module.css";
import { Navigate } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { Textarea } from "../common/FormControls/FormControls.jsx";
import { maxLengthCreator, required } from "../../utils/validators/validators.js";

const maxLengthMessage = maxLengthCreator(10);

const Dialogs = (props) => {
  let state = props.dialogsPage;

  const dialogsMassive = state.dialogsData.map((dialog, index) => {
    return (
      <DialogItem
        id={dialog.id}
        name={dialog.name}
        key={index}
      ></DialogItem>
    );
  });

  const messagesMassive = state.messagesData.map((message, index) => {
    return (
      <Message
        id={message.id}
        message={message.text}
        key={index}
      ></Message>
    );
  });

  const addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody);
	values.newMessageBody = '';
  };

  if (!props.isAuth) {
    return <Navigate to="/login"></Navigate>;
  }

  return (
    <div>
      <div className={s.dialogs}>
        <div className={s.dialogsItems}>{dialogsMassive}</div>
        <div className={s.messages}>
          <div>{messagesMassive}</div>
          <AddMessageFormRedux onSubmit={addNewMessage} />
        </div>
      </div>
    </div>
  );
};

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
		  validate={[required, maxLengthMessage]}
          name="newMessageBody"
          placeholder="Введите сообщение"
        />
      </div>
      <div>
        <button>Отправить сообщение</button>
      </div>
    </form>
  );
};

const AddMessageFormRedux = reduxForm({ form: "dialogAddMessageForm" })(
  AddMessageForm
);

export default Dialogs;
