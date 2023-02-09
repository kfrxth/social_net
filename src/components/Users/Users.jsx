import React from "react";
import { Paginator } from "../common/Paginator/Paginator";
import { User } from "./User";

const Users = (props) => {
  return (
    <div>
      <Paginator
        onPageChanged={props.onPageChanged}
        currentPage={props.currentPage}
        pageSize={props.pageSize}
        totalUsersCount={props.totalUsersCount}
      />
      <div>
        {props.users.map((u, index) => (
          <User
            key={index}
            user={u}
            follow={props.follow}
            unfollow={props.unfollow}
            followingInProgress={props.followingInProgress}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
