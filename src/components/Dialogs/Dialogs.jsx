import React from "react";
import DialogItem from "./DialogItem/DialogItem.jsx";
import Message from "./Message/Message";
import s from "./Dialogs.module.css";

const Dialogs = (props) => {
  let state = props.dialogsPage;

  const dialogsMassive = state.dialogsData.map((dialog) => {
    return (
      <DialogItem
        id={dialog.id}
        name={dialog.name}
        key={dialog.id}
      ></DialogItem>
    );
  });

  const messagesMassive = state.messagesData.map((message) => {
    return (
      <Message
        id={message.id}
        message={message.text}
        key={message.id}
      ></Message>
    );
  });

  let newMessageBody = state.textMessage;

  const newMessageRef = React.createRef();

  const onSendNewMessage = () => {
    props.sendMessage();
  };

  const onMessageChange = (e) => {
    let text = e.target.value;
    props.updateNewMessage(text);
  };

  return (
    <div>
      <div className={s.dialogs}>
        <div className={s.dialogsItems}>{dialogsMassive}</div>
        <div className={s.messages}>
          <div>{messagesMassive}</div>
          <div>
            <div>
              <textarea
                placeholder="Введите сообщение"
                ref={newMessageRef}
                onChange={onMessageChange}
                value={newMessageBody}
              />
            </div>
            <div>
              <button onClick={onSendNewMessage}>Отправить сообщение</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
