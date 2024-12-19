import CalorieRecord from "./CalorieRecord";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import styles from "./RecordList.module.css";

function RecordList(props) {
  const { totalCalories } = useContext(AppContext);
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
