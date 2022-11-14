import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const posts = (props) => {
  const postElements = props.posts.map((post) => {
    return <Post message={post.message} id={post.id} likes={post.likes} />;
  });

  const newPostRef = React.createRef();

  const onAddPost = () => {
    const text = newPostRef.current.value;
    props.addPost(text);
	newPostRef.current.value = '';
  };

  return (
    <div className={s.postsBlock}>
      <h3>Мои посты</h3>
      <div>
        <div>
          <textarea ref={newPostRef}></textarea>
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
