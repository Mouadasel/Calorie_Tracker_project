import CalorieRecord from "./CalorieRecord";
import React, { useEffect, useState } from "react";
import styles from "./RecordList.module.css";

function RecordList(props) {
  const [totalCalories, setTotalCalories] = useState(0);
  const resultsElement = props.records?.length ? (
    <ul className={styles.list}>
      {props.records.map(
        (record) =>
          record.calories >= 0 && (
            <li className={styles.listItems} key={record.id}>
              <CalorieRecord
                date={record.date}
                meal={record.meal}
                content={record.content}
                calories={record.calories}
                addCalories={setTotalCalories}
              />
            </li>
          )
      )}
    </ul>
  ) : (
    <div className={styles.placeholder}>No records found for this date</div>
  );
  return (
    <>
      {resultsElement}
      <label>Total Calories : {totalCalories}</label>
    </>
  );
}
export default RecordList;
