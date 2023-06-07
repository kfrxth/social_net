import React, { FC } from "react";
import { Paginator } from "../common/Paginator/Paginator";
import { User } from "./User";
import { UserType } from "../types/types";

type PropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (i: number) => void;
  users: Array<UserType>;
  follow: () => void;
  unfollow: () => void;
  followingInProgress: Array<number>;
};

const Users: FC<PropsType> = (props) => {
  return (
    <div>
      <Paginator
        onPageChanged={props.onPageChanged}
        currentPage={props.currentPage}
        pageSize={props.pageSize}
        totalUsersCount={props.totalUsersCount}
      />
      <div>
        {props.users.map((u, index: number) => (
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
