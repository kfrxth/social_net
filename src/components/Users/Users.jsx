import React from "react";
import styles from "./users.module.css";

const Users = (props) => {
  if (props.users.length === 0) {
    props.setUsers([
      {
        id: 1,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHdizJ0vfyHe05Bdp3TwK_Ib-5Bf-tJg9YqPFN8kdLSmtna40VEQqX3taNstRZB2zGDPU&usqp=CAU",
        follow: true,
        name: "Дмитрий К.",
        job: {
          department: "Бухгалтерский отдел",
          post: "Главный бухгалтер",
        },
        status: `2+2=4`,
      },
      {
        id: 2,
        image:
          "https://pbs.twimg.com/profile_images/1167253265806962691/hmaUNnIc_400x400.jpg",
        follow: false,
        name: "Иван И.",
        job: {
          department: "Менеджмент",
          post: "Начальник отдела",
        },
        status: `2+2=5`,
      },
    ]);
  }

  return (
    <div>
      {props.users.map((user) => (
        <div key={user.id}>
          <span>
            <div>
              <img
                src={user.image}
                alt="img"
                className={styles.userAvatar}
              ></img>
            </div>
            <div>
              {user.follow ? (
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
              <div>{`${user.job.department},`}</div>
            </span>
            <span>
              <div>{user.job.post}</div>
              <div>{`Статус: ${user.status}`}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Users;
