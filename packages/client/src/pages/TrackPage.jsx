import { RecordList } from "@components/records";
import styles from "./TrackPage.module.css";
import { useLoadData } from "@root/utils/hooks";
import { Link } from "react-router-dom";
import { TextContent } from "@root/common";
import { useContext } from "react";
import { AppContext } from "@root/AppContext";

export function TrackPage() {
  const { currentDateStr, setCurrentDate } = useContext(AppContext);
  const [records, loading, error, refreshData] = useLoadData(
    `http://localhost:3000/records?date=${currentDateStr}`
  );
  const dateChangeHandler = (event) => {
    setCurrentDate(event.target.value);
  };

  let content = <RecordList records={records} refresh={refreshData}/>;

  if (error) {
    content = <TextContent value={error} />;
  }
  if (loading) {
    content = <TextContent value="Loading..." />;
  }

  return (
    <>
      <h1 className={styles.title}>Calorie Tracker</h1>
      <div className={styles["list-header-wrapper"]}>
        <div className={styles["list-picker"]}>
          <label htmlFor="listingDate" className={styles["list-picker-label"]}>
            Select Date
          </label>
          <input
            id="listingDate"
            type="date"
            value={currentDateStr}
            className={styles["list-picker-input"]}
            onChange={dateChangeHandler}
          />
        </div>
        <Link to="create" className={styles["add-btn"]}>
          Track Food
        </Link>
      </div>
      {content}
    </>
  );
}
