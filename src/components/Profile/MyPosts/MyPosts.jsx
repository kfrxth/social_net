import React from "react";
import {
  addPostActionCreator,
  updateNewPostTextActionCreator,
} from "../../../redux/State";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const posts = (props) => {
  const postElements = props.posts.map((post) => {
    return <Post message={post.message} id={post.id} likes={post.likes} />;
  });

  const newPostRef = React.createRef();

  const onAddPost = () => {
    props.dispatch(addPostActionCreator());
  };

  const onPostChange = () => {
    let text = newPostRef.current.value;
    props.dispatch(updateNewPostTextActionCreator(text));
  };

  return (
    <div className={s.postsBlock}>
      <h3>Мои посты</h3>
      <div>
        <div>
          <textarea
            ref={newPostRef}
            onChange={onPostChange}
            value={props.newPostText}
          />
        </div>
        <div>
          <button onClick={onAddPost}>Добавить пост</button>
        </div>
      </div>
      <div className={s.posts}>{postElements}</div>
    </div>
  );
};

export default posts;
