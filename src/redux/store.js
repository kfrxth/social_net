import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

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
	this._state.profilePage = profileReducer(this._state.profilePage, action);
	this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
	this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._callSubscriber(this._state);
  },
};

//window.state = store._state;
export default store;
