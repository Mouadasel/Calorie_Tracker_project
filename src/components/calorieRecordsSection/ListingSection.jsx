import { Fragment, useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import RecordList from "./RecordList";
import styles from "./ListingSection.module.css";

function ListingSection(props) {
  const { allRecords } = props;
  const { currentDate, currentDateStr, setCurrentDate } =
    useContext(AppContext);
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    // Calls APIs to load data for current date.
    const timeoutId = setTimeout(() => {
      setFilteredRecords(allRecords.filter(dateFilter));
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentDateStr]);

  const dateChangeHandler = (event) => {
    setCurrentDate(event.target.value);
  };
  const dateFilter = (record) =>
    record.date.getDate() === currentDate.getDate() &&
    record.date.getMonth() === currentDate.getMonth() &&
    record.date.getFullYear() === currentDate.getFullYear();

  return (
    <Fragment>
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
      <RecordList records={filteredRecords.filter(dateFilter)} />
    </Fragment>
  );
}

export default ListingSection;
