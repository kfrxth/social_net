import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
  const postElements = props.posts.map((post) => {
    return <Post message={post.message} id={post.id} likes={post.likes} />;
  });

  const newPostRef = React.createRef();

  const onAddPost = () => {
    props.addPost();
  };

  const onPostChange = () => {
    let text = newPostRef.current.value;
    props.updateNewPostText(text);
  };

  return (
    <div className={s.postsBlock}>
      <h3>Мои посты</h3>
      <div>
        <div>
          <textarea
		  	className={s.textarea}
            ref={newPostRef}
            onChange={onPostChange}
            value={props.newPostText}
			placeholder="Что нового?"		
          />
        </div>
        <div>
          <button onClick={onAddPost} className={s.button}>Добавить пост</button>
        </div>
      </div>
      <div className={s.posts}>{postElements}</div>
    </div>
  );
};

export default MyPosts;
