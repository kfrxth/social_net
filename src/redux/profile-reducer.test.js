import profileReducer, { addPostActionCreator } from "./profile-reducer";
import React from 'react';

it('Length of posts should be incremented', () => {
	let action = addPostActionCreator("test text");
	let state = {
		posts: [
		  {
			id: 1,
			message: "Hi, you are",
			likes: 10,
			isLiked: false,
		  },
		  {
			id: 2,
			message: "its me yees",
			likes: 15,
			isLiked: false,
		  },
		],
		profile: null,
		status: "",
	  };

	let newState = profileReducer(state, action);

	expect(newState.posts.length).toBe(3);
})