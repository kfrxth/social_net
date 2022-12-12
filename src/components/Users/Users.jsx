import axios from "axios";
import React from "react";
import styles from "./users.module.css";

const userPhoto =
  "https://png.clipart.me/istock/previews/1929/19298171-funny-cartoon-office-worker.jpg";
const apiAddress = "https://social-network.samuraijs.com/api/1.0/users?term=g";

class Users extends React.Component {
  componentDidMount() {
    if (this.props.users.length === 0) {
      axios.get(apiAddress).then((response) => {
        this.props.setUsers(response.data.items);
      });
    }
  }

  render() {
    const pageCount = this.props.totalUsersCount / this.props.pageSize;

    let pages = [];

    for (let i = 1; i <= pageCount; i++) {
      pages.push(i);
    }

    return (
      <div>
        <div>
          {pages.map((i) => {
            return <span className={this.props.currentPage === i ? styles.selectedPage : styles.span}>{i}</span>;
          })}
        </div>
        {this.props.users.map((user) => (
          <div key={user.id}>
            <span>
              <div>
                <img
                  src={
                    user.photos.small !== null ? user.photos.small : userPhoto
                  }
                  alt="img"
                  className={styles.userAvatar}
                ></img>
              </div>
              <div>
                {user.followed ? (
                  <button onClick={() => this.props.unfollow(user.id)}>
                    Отписаться
                  </button>
                ) : (
                  <button onClick={() => this.props.follow(user.id)}>
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
  }
}

export default Users;
