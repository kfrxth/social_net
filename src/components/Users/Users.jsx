import React from "react";
import styles from "./users.module.css";

const Users = (props) => {
  const userPhoto =
    "https://png.clipart.me/istock/previews/1929/19298171-funny-cartoon-office-worker.jpg";
  const pageCount = Math.ceil(props.totalUsersCount / props.pageSize);

  let pages = [];

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div>
        {pages.map((i) => {
          return (
            <span
              className={
                props.currentPage === i ? styles.selectedPage : styles.span
              }
              onClick={() => props.onPageChanged(i)}
            >
              {i}
            </span>
          );
        })}
      </div>
      {props.users.map((user) => (
        <div key={user.id}>
          <span>
            <div>
              <img
                src={user.photos.small !== null ? user.photos.small : userPhoto}
                alt="img"
                className={styles.userAvatar}
              ></img>
            </div>
            <div>
              {user.followed ? (
                <button onClick={() => props.unfollow(user.id)}>
                  Отписаться
                </button>
              ) : (
                <button onClick={() => props.follow(user.id)}>
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
      ))}
    </div>
  );
};

export default Users;