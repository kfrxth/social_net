const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

const SEND_NEW_MESSAGE = "SEND-NEW-MESSAGE";
const UPDATE_NEW_MESSAGE = "UPDATE-NEW-MESSAGE";

let store = {
  _state: {
    profilePage: {
      posts: [
        {
          id: 1,
          message: "Hi, you are",
          likes: 10,
        },
        {
          id: 2,
          message: "its me yees",
          likes: 15,
        },
      ],
      newPostText: "",
    },
    dialogsPage: {
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
    },
    sidebar: {},
  },
  _callSubscriber() {
    console.log("State changed");
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },
  getState() {
    return this._state;
  },
  dispatch(action) {
    if (action.type === ADD_POST) {
      if (this._state.profilePage.newPostText) {
        let newPost = {
          id: 5,
          message: this._state.profilePage.newPostText,
          likes: 0,
        };
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = "";
        this._callSubscriber(this._state);
      }
    }
    if (action.type === UPDATE_NEW_POST_TEXT) {
      this._state.profilePage.newPostText = action.newText;
      this._callSubscriber(this._state);
    }
    if (action.type === SEND_NEW_MESSAGE) {
      let newMessage = {
        id: 10,
        text: this._state.dialogsPage.textMessage,
      };
      this._state.dialogsPage.messagesData.push(newMessage);
      this._state.dialogsPage.textMessage = "";
      this._callSubscriber(this._state);
    }
    if (action.type === UPDATE_NEW_MESSAGE) {
      this._state.dialogsPage.textMessage = action.newText;
      this._callSubscriber(this._state);
    }
  },
};

export const addPostActionCreator = () => {
  return {
    type: ADD_POST,
  };
};

export const updateNewPostTextActionCreator = (text) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
  };
};

export const sendNewMessageActionCreator = () => {
  return {
    type: SEND_NEW_MESSAGE
  };
};

export const updateNewMessageActionCreator = (text) => {
  return {
    type: UPDATE_NEW_MESSAGE,
    newText: text,
  };
};

//window.state = store._state;
export default store;
