const SEND_NEW_MESSAGE = "SEND-NEW-MESSAGE";
const UPDATE_NEW_MESSAGE = "UPDATE-NEW-MESSAGE";

let initialState =  {
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
	textMessage: "",
  };

const dialogsReducer = (state = initialState, action) => {
  if (action.type === SEND_NEW_MESSAGE) {
    if (state.textMessage) {
      let newMessage = {
        id: 10,
        text: state.textMessage,
      };
      state.messagesData.push(newMessage);
      state.textMessage = "";
    }
  }
  if (action.type === UPDATE_NEW_MESSAGE) {
    state.textMessage = action.newText;
  }

  return state;
};

export const sendNewMessageActionCreator = () => {
  return {
    type: SEND_NEW_MESSAGE,
  };
};

export const updateNewMessageActionCreator = (text) => {
  return {
    type: UPDATE_NEW_MESSAGE,
    newText: text,
  };
};

export default dialogsReducer;
