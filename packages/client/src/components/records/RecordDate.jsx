import styles from "./RecordDate.module.css";
import { StyledRecordCell } from "@common";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function RecordDate(props) {
  const month = MONTHS[props.date.getMonth()];
  const day = props.date.getDate();
  const year = props.date.getFullYear();
  return (
    <StyledRecordCell>
      <div className={styles["record-date-month"]}>{month}</div>
      <div className={styles["record-date-day"]}>{day}</div>
      <div className={styles["record-date-year"]}>{year}</div>
    </StyledRecordCell>
  );
}
