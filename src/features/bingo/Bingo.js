import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDataAsync,
  toggleSelect,
  clearLocalData,
  filterData,
} from "./bingoSlice";
import styles from "./Bingo.module.css";
function toDateTime(secs) {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return t;
}
function ListItem(props) {
  return (
    <li
      className={`${styles.bingoItem} ${props.value.bingo ? styles.bingo : ""}`}
    >
      <div>{props.index + 1}</div>
      <div>{props.value.id}</div>
      <div>{toDateTime(props.value.date.seconds).toLocaleDateString()}</div>
      <div>
        {props.value.numbers.map(function (item, index) {
          return <span key={index}>{item}</span>;
        })}
      </div>
      <div className={styles.textRight}>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(props.value.total)}
      </div>
    </li>
  );
}
export function Bingo() {
  const bingos = useSelector(filterData);
  const itemCount = useSelector((state) => state.bingo.itemCount);
  const dispatch = useDispatch();
  let itemCountArray = [];
  itemCountArray = Object.entries(itemCount).map(function (item) {
    return { key: item[0] * 1, value: item[1] };
  });
  itemCountArray = itemCountArray.sort(function (a, b) {
    return b.value.count - a.value.count;
  });
  useEffect(() => {
    dispatch(getDataAsync());
  }, [dispatch]);
  return (
    <div>
      <div
        className={`${styles.btn}`}
        onClick={() => {
          dispatch(clearLocalData());
          dispatch(getDataAsync());
        }}
      >
        Clear Cache
      </div>
      <div className={`${styles.flexContainer}`}>
        {itemCountArray.map(function (item) {
          return (
            <div
              key={item.key}
              className={`${styles.numbers} ${
                item.value.selected ? styles.selected : ""
              }`}
              onClick={() => dispatch(toggleSelect(item.key))}
            >
              <h3>{item.key}</h3>
              <span className={`count`}>{item.value.count}</span>
            </div>
          );
        })}
      </div>
      <ul className={styles.flexContainer}>
        {bingos.map((item, index) => (
          <ListItem key={item.id} value={item} index={index} />
        ))}
      </ul>
    </div>
  );
}
