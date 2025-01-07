import CalorieRecord from "./CalorieRecord";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import styles from "./RecordList.module.css";
import { Link } from "react-router-dom";

function RecordList(props) {
  const { totalCalories } = useContext(AppContext);
  const resultsElement = props.records?.length ? (
    <ul className={styles.list}>
      {props.records.map((record) => (
        <li className={styles.listItems} key={record.id}>
          <Link to={`${record.id}`}>
            <CalorieRecord {...record} />
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
export default RecordList;
