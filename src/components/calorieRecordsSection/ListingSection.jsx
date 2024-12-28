import { useContext } from "react";
import { AppContext } from "../../AppContext";
import RecordList from "./RecordList";
import styles from "./ListingSection.module.css";

function ListingSection(props) {
  const { allRecords } = props;
  const { currentDate, currentDateStr, setCurrentDate } =
    useContext(AppContext);

  const dateChangeHandler = (event) => {
    setCurrentDate(event.target.value);
  };
  const dateFilter = (record) =>
    record.date.getDate() === currentDate.getDate() &&
    record.date.getMonth() === currentDate.getMonth() &&
    record.date.getFullYear() === currentDate.getFullYear();

  return (
    <>
      <label htmlFor="listingDate" className={styles["listing-picker-label"]}>
        Select Date
      </label>
      <input
        id="listingDate"
        type="date"
        value={currentDateStr}
        className={styles["listing-picker-input"]}
        onChange={dateChangeHandler}
      />
      <RecordList records={allRecords.filter(dateFilter)} />
    </>
  );
}

export default ListingSection;
