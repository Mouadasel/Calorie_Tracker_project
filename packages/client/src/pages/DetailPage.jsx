import { Link, useParams } from "react-router-dom";
import styles from "./DetailPage.module.css";
import { TextContent } from "@root/common";
import { useLoadData } from "@root/utils/hooks";

export function DetailPage() {
  const params = useParams();
  const [detail, _, error] = useLoadData(
    `http://localhost:3000/records/${params.recordId}`,
    "single"
  );
  let content = <TextContent value={error} />;
  if (!error) {
    content = detail && (
      <div className={styles.container}>
        <div className={styles.item}>
          <p>Date:</p>
          <p>{detail.date.toLocaleDateString()}</p>
        </div>
        <div className={styles.item}>
          <p>Meal:</p>
          <p>{detail.meal}</p>
        </div>
        <div className={styles.item}>
          <p>Food:</p>
          <p>{detail.content}</p>
        </div>
        <div className={styles.item}>
          <p>Calories:</p>
          <p>{detail.calories}</p>
        </div>
        <div className={styles.item}>
          <Link to="..">Go to track page</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {content}
      <Link to="..">Back to List page</Link>
    </>
  );
}
