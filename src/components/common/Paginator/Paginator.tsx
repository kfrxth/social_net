import React from "react";
import styles from "./Paginator.module.css";

export type PropsTypePaginator = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (i: number) => void;
};

export const Paginator: React.FC<PropsTypePaginator> = (props) => {
  const pageCount = Math.ceil(props.totalUsersCount / props.pageSize);

  let pages: Array<number> = [];

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      {pages.map((i) => {
        if (
          i === 1 ||
          (i <= props.currentPage + 5 && i >= props.currentPage - 5) ||
          i === pages.length
        ) {
          return (
            <span
              key={i}
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
          return <span key={i}> . . .</span>;
        }
        return <span key={i}></span>;
      })}
    </div>
  );
};
