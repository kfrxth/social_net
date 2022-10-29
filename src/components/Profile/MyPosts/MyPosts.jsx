import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = () => {
  return (
    <div className={s.postsBlock}>
      <h3>Мои посты</h3>
      <div>
        <div>
          <textarea></textarea>
        </div>
        <div>
          <button>Добавить пост</button>
        </div>
      </div>
      <div className={s.posts}>
        <Post message="Hi, you are" like="10" />
        <Post message={`its me yees`} like="15" />
      </div>
    </div>
  );
};

export default MyPosts;
