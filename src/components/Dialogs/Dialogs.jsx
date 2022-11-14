import React from "react";
import DialogItem from "./DialogItem/DialogItem.jsx";
import Message from "./Message/Message";
import s from "./Dialogs.module.css";

const Dialogs = (props) => {
  const dialogsMassive = props.state.dialogsData.map((dialog) => {
    return <DialogItem id={dialog.id} name={dialog.name}></DialogItem>;
  });

  const messagesMassive = props.state.messagesData.map((message) => {
    return <Message id={message.id} message={message.text}></Message>;
  });

  const newMessageRef = React.createRef();

  const sendMessage = () => {
	const text = newMessageRef.current.value;
	alert(text);
  }

  return (
    <div>
      <div className={s.dialogs}>
        <div className={s.dialogsItems}>{dialogsMassive}</div>
        <div className={s.messages}>{messagesMassive}</div>
      </div>
      <div>
        <div>
          <textarea ref={newMessageRef}></textarea>
        </div>
        <div>
          <button onClick={sendMessage}>Отправить сообщение</button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
