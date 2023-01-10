import React from "react";
import { Field, reduxForm } from "redux-form";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {required, maxLengthCreator} from "../../../utils/validators/validators"
import { Textarea } from "../../common/FormControls/FormControls";

const maxLength10 = maxLengthCreator(20);

const MyPosts = (props) => {
  const postElements = props.posts.map((post, index) => {
    return <Post message={post.message} id={post.id} likes={post.likes} key={index} />;
  });

  const addNewPost = (values) => {
    props.addPost(values.newPostBody);
    values.newPostBody = "";
  };

  return (
    <div className={s.postsBlock}>
      <h3>Мои посты</h3>
      <AddPostFormRedux onSubmit={addNewPost} />
      <div className={s.posts}>{postElements}</div>
    </div>
  );
};

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          name="newPostBody"
          placeholder="Что нового?"
		  validate={[required, maxLength10]}
        />
      </div>
      <div>
        <button className={s.button}>Добавить пост</button>
      </div>
    </form>
  );
};

const AddPostFormRedux = reduxForm({ form: "addPostForm" })(
  AddNewPostForm
);

export default MyPosts;
