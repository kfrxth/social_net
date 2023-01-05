import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./users.module.css";
import userPhoto from "../../img/19298171-funny-cartoon-office-worker.jpeg";

const Users = (props) => {
  const pageCount = Math.ceil(props.totalUsersCount / props.pageSize);

  let pages = [];

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  const paginationPages = () => {
    return pages.map((i) => {
      if (
        i === 1 ||
        (i <= props.currentPage + 3 && i >= props.currentPage - 3) ||
        i === pages.length
      ) {
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
      }
      if (i === pages.length - 1) {
        return <> . . .</>;
      }
      return <></>;
    });
  };
  
  const usersItems = () => {
    return props.users.map((user) => (
      <div key={user.id}>
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
                disabled={props.followingInProgress.some(
                  (id) => id === user.id
                )}
                onClick={() => {
                  props.unfollow(user.id);
                }}
              >
                Отписаться
              </button>
            ) : (
              <button
                disabled={props.followingInProgress.some(
                  (id) => id === user.id
                )}
                onClick={() => {
                  props.follow(user.id);
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
    ));
  };

  return (
    <div>
      <div>{paginationPages()}</div>
      {usersItems()}
    </div>
  );
};

export default Users;
