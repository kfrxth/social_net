import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./users.module.css";
import userPhoto from "../../img/19298171-funny-cartoon-office-worker.jpeg";

export const User = ({ user, followingInProgress, unfollow, follow }) => {
  return (
    <div>
      <span>
        <div>
          <NavLink to={"/profile/" + user.id}>
            <img
              src={user.photos.small !== null ? user.photos.small : userPhoto}
              alt="img"
              className={styles.userAvatar}
            ></img>
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                unfollow(user.id);
              }}
            >
              Отписаться
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => {
                follow(user.id);
              }}
            >
              Подписаться
            </button>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>user.job.department</div>
        </span>
        <span>
          <div>user.job.post</div>
          <div>user.status</div>
        </span>
      </span>
    </div>
  );
};
