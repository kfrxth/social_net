import {rerenderMainTree} from '../render';

const state = {
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
  },
  sidebar: {},
};

export const addPost = (postMessage) => {
  let newPost = {
    id: 5,
    message: postMessage,
    likes: 0,
  };
  state.profilePage.posts.push(newPost);
  rerenderMainTree(state);
};

export default state;
