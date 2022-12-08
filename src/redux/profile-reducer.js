const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

let initialState = {
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
};

const profileReducer = (state = initialState, action) => {
  if (action.type === ADD_POST) {
    if (state.newPostText) {
      let newPost = {
        id: 5,
        message: state.newPostText,
        likes: 0,
      };
	  
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: "",
      };
    }
  }
  if (action.type === UPDATE_NEW_POST_TEXT) {
    return {
      ...state,
      newPostText: action.newText,
    };
  }

  return state;
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

export default profileReducer;
