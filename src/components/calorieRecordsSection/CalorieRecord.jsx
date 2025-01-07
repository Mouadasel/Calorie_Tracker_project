import styles from "./CalorieRecord.module.css";
import CalorieRecordDate from "./CalorieRecordDate";
import StyledRecordCell from "../common/StyledRecordCell";
import { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";

function CalorieRecord(props) {
  const { setTotalCalories: addCalories } = useContext(AppContext);
  if (props.calories < 0) {
    return null;
  }

  useEffect(() => {
    addCalories((prevTotal) => prevTotal + props.calories);
    return () => {
      addCalories((prevTotal) => prevTotal - props.calories);
    };
  }, [props.calories]);
  return (
    <ul className={styles.record}>
      <li>
        <CalorieRecordDate date={props.date} />
      </li>
      <li>{props.meal}</li>
      <li>{props.content}</li>
      <li className={styles["record-calories"]}>
        <StyledRecordCell>{props.calories}</StyledRecordCell>
      </li>
    </ul>
  );
}

export default CalorieRecord;
