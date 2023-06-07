const SEND_NEW_MESSAGE = "SEND-NEW-MESSAGE";

type actionType = {
  type: typeof SEND_NEW_MESSAGE;
  newMessageBody: string;
};

export type DialoagType = {
  id: number;
  name: string;
};

export type MessagesType = {
  id: number;
  text: string;
};

export type InitialState = typeof initialState;

type SendNewMessageActionCreatorType = {
  type: typeof SEND_NEW_MESSAGE;
  newMessageBody: string;
};

let initialState = {
  messagesData: [
    {
      id: 1,
      text: "Hi",
    },
    {
      id: 2,
      text: "WHATSUP",
    },
    {
      id: 3,
      text: "YO",
    },
  ] as Array<MessagesType>,
  dialogsData: [
    {
      id: 1,
      name: "Andrey",
    },
    {
      id: 2,
      name: "Aleksey",
    },
    {
      id: 3,
      name: "Victor",
    },
    {
      id: 4,
      name: "Matvey",
    },
    {
      id: 5,
      name: "Valentin",
    },
  ] as Array<DialoagType>,
};

const dialogsReducer = (state = initialState, action: actionType) => {
  if (action.type === SEND_NEW_MESSAGE) {
    if (action.newMessageBody) {
      return {
        ...state,
        messagesData: [
          ...state.messagesData,
          { id: 1, text: action.newMessageBody },
        ],
      };
    }
  }

  return state;
};

export const sendNewMessageActionCreator = (
  newMessageBody: string
): SendNewMessageActionCreatorType => {
  return {
    type: SEND_NEW_MESSAGE,
    newMessageBody,
  };
};

export default dialogsReducer;
