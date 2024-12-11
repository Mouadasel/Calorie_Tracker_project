import { useEffect, useState } from "react";
import RecordList from "./RecordList";
import styles from "./ListingSection.module.css";


function ListingSection(props) {
  const { allRecords, currentDate, setCurrentDate } = props;

  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    // Calls APIs to load data for current date.
    const timeoutId = setTimeout(() => {
      setFilteredRecords(allRecords.filter(dateFilter));
      console.log("Data loaded");
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
      console.log("old tiemout cleared");
    };
  }, [currentDate]);

  const dateChangeHandler = (event) => {
    setCurrentDate(new Date(event.target.value));
  };
  const dateFilter = (record) => {
    return (
      record.date.getUTCDate() === currentDate.getUTCDate() &&
      record.date.getUTCMonth() === currentDate.getUTCMonth() &&
      record.date.getUTCFullYear() === currentDate.getUTCFullYear()
    );
  };

  return (
    <>
      <label htmlFor="listingDate" className={styles["listing-picker-label"]}>
        Select Date
      </label>
      <input
        id="listingDate"
        type="date"
        value={currentDate.toISOString().split("T")[0]}
        className={styles["listing-picker-input"]}
        onChange={dateChangeHandler}
      />
      <RecordList records={filteredRecords} />
    </>
  );
}

export default ListingSection;
