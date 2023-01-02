const SEND_NEW_MESSAGE = "SEND-NEW-MESSAGE";

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
  ],
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
  ],
};

const dialogsReducer = (state = initialState, action) => {
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

export const sendNewMessageActionCreator = (newMessageBody) => {
  return {
    type: SEND_NEW_MESSAGE,
	newMessageBody
  };
};

export default dialogsReducer;
