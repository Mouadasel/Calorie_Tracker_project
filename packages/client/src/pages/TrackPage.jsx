import { useEffect, useState } from "react";
import { Form } from "@components/edit";
import { ListSection } from "@components/records";
import Modal from "react-modal";
import styles from "./TrackPage.module.css";
import { getDateFromString } from "@root/utils";

const LOCAL_STORAGE_KEY = "calorieRecords";

export function TrackPage() {
  const [records, setRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function save(record) {
    try {
      const reponse = await fetch("http://localhost:3000/records", {
        method: "POST",
        body: JSON.stringify({
          r_date: record.date,
          r_meal: record.meal,
          r_food: record.content,
          r_cal: record.calories,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!reponse.ok) {
        throw new Error("Failed to create new record");
      }
    } catch (error) {
      setError(error.message);
    }
  }
  async function loadRecords() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/records");
      if (response.status === 404) {
        throw new Error("Data not found");
      }
      if (!response.ok) {
        throw new Error("Unknown error");
      }
      const data = response.json;
      setRecords(
        data.result.map((record) => ({
          id: record.id,
          date: getDateFromString(record.r_date),
          meal: record.r_meal,
          content: record.r_food,
          calories: record.r_cal,
        }))
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRecords();
  }, []);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
      maxWidth: "900px",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const formSubmitHandler = (record) => {
    save(record);
    handleCloseModal();
  };
  return (
    <div className="App">
      <h1 className={styles.title}>Calorie Tracker</h1>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Form Modal"
        style={customStyles}
      >
        <Form onFormSubmit={formSubmitHandler} onCancel={handleCloseModal} />
      </Modal>
      {records && (
        <ListSection allRecords={records} isLoading={loading} error={error} />
      )}

      <button onClick={handleOpenModal} className={styles["open-modal-btn"]}>
        Track Food
      </button>
    </div>
  );
}
