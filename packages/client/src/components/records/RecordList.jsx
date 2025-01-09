import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "@root/AppContext";
import { Record } from "@components/records";
import styles from "./RecordList.module.css";

export function RecordList(props) {
  const { totalCalories } = useContext(AppContext);
  const resultsElement = props.records?.length ? (
    <ul className={styles.list}>
      {props.records.map((record) => (
        <li className={styles.listItems} key={record.id}>
          <Link to={`${record.id}`}>
            <Record {...record} />
          </Link>
        </li>
      ))}
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
