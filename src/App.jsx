import { useEffect, useState } from "react";
import CaloriesRecordEdit from "./components/edit/CaloriesRecordEdit";
import ListingSection from "./components/calorieRecordsSection/ListingSection";
import Modal from "react-modal";
import styles from "./App.module.css";
import AppContextProvider from "./AppContext";

const LOCAL_STORAGE_KEY = "calorieRecords";

function App() {
  const [records, setRecords] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function save() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
  }
  function loadRecords() {
    const storageRecords = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storageRecords != null && storageRecords != "undefined") {
      setRecords(
        JSON.parse(storageRecords).map((record) => ({
          ...record,
          date: new Date(record.date),
          calories: Number(record.calories),
        }))
      );
    } else {
      setRecords([]);
    }
  }

  useEffect(() => {
    if (!records) {
      loadRecords();
    } else {
      save();
    }
  }, [records]);

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
    const formattedRecord = {
      ...record,
      date: new Date(record.date),
      id: crypto.randomUUID(),
    };
    setRecords((prevRecords) => [formattedRecord, ...prevRecords]);
    handleCloseModal();
  };
  return (
    <div className="App">
      <h1 className={styles.title}>Calorie Tracker</h1>
      <AppContextProvider>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Form Modal"
          style={customStyles}
        >
          <CaloriesRecordEdit
            onFormSubmit={formSubmitHandler}
            onCancel={handleCloseModal}
          />
        </Modal>
        {records && <ListingSection allRecords={records} />}
      </AppContextProvider>
      <button onClick={handleOpenModal} className={styles["open-modal-btn"]}>
        Track Food
      </button>
    </div>
  );
}

export default App;
