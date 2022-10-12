import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = () => {
  return (
    <div>
      мои посты
      <div>
        <textarea></textarea>
        <button>Добавить пост</button>
      </div>
      <div>
        <Post message="Hi, you are" like="10" />
        <Post message={`its me yees`} like="15" />
      </div>
    </div>
  );
};

export default MyPosts;
