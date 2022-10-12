import React from "react";
import s from "./Post.module.css";

const Post = (props) => {
  return (
    <div className={s.item}>
      <img alt="ava" src="https://delovoymir.biz/res/images/uploaded/columns/15756.jpg">
      </img>
	  <span>{props.message}</span>
	  <div>
	  <span>{`${props.like} ♥`}</span>
	  </div>
	  
    </div>
  );
};

export default Post;
