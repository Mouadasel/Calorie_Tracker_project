import { useContext, useEffect, useReducer, useState } from "react";
import styles from "./CaloriesRecordEdit.module.css";
import { AppContext } from "../../AppContext";

const DEFAULT_VALUE = {
  meal: { value: "Breakfast", valid: true },
  content: { value: "", valid: false },
  calories: { value: 0, valid: false },
};
function formReducer(state, action) {
  const { type, key, value } = action;
  if (type == "RESET") {
    return DEFAULT_VALUE;
  }
  let valid;
  switch (key) {
    case "content":
      valid =
        (value === "sport" && state.calories.value < 0) ||
        (value !== "sport" && state.calories.value >= 0);
      return {
        ...state,
        content: { value, valid: !!value },
        calories: { ...state.calories, valid },
      };

    case "calories":
      valid =
        (state.content.value === "sport" && value < 0) ||
        (state.content.value !== "sport" && value >= 0);
      return {
        ...state,
        calories: { value, valid },
      };
    default:
      valid = !!value;
      return {
        ...state,
        [key]: { value, valid },
      };
  }
}

function CaloriesRecordEdit(props) {
  const [isFormValid, setIsFormValid] = useState(false);
  const {
    currentDate,
    currentDateStr,
    isValidDate,
    setCurrentDate,
    totalCalories,
  } = useContext(AppContext);
  const [formState, dispatchFn] = useReducer(formReducer, DEFAULT_VALUE);

  const {
    content: { valid: isContentValid },
    calories: { valid: isCalorieValid },
  } = formState;

  useEffect(() => {
    setIsFormValid(isValidDate && isContentValid && isCalorieValid);
  }, [isValidDate, isContentValid, isCalorieValid]);

  const onDateChangeHandler = (event) => {
    setCurrentDate(event.target.value);
    
  };
  const onMealChangeHandler = (event) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      key: "meal",
      value: event.target.value,
    });
  };
  const onContentChangeHandler = (event) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      key: "content",
      value: event.target.value,
    });
  };
  const onCalorieChangeHandler = (event) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      key: "calories",
      value: Number(event.target.value),
    });
    console.log(formState);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onFormSubmit({
      date: currentDate,
      ...Object.keys(formState).reduce((aggr, cur) => {
        aggr[cur] = formState[cur].value;
        return aggr;
      }, {}),
    });
    
    dispatchFn({ type: "RESET" });
  };
  const onCancelHandler = () => {
    dispatchFn({ type: "RESET" });
    props.onCancel();
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <p className={styles.warning}>You spent {totalCalories} calories</p>
      <label htmlFor="date">Date:</label>
      <input
        type="date"
        id="date"
        value={currentDateStr}
        onChange={onDateChangeHandler}
        className={`${styles["form-input"]} ${
          !isValidDate ? styles.error : ""
        }`}
      />
      <label htmlFor="meal">Meal:</label>
      <select
        id="meal"
        value={formState.meal.value}
        onChange={onMealChangeHandler}
        className={styles["form-input"]}
      >
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </select>
      <label htmlFor="content">Content:</label>
      <input
        type="text"
        id="content"
        value={formState.content.value}
        onChange={onContentChangeHandler}
        className={`${styles["form-input"]} ${
          !isContentValid ? styles.error : ""
        }`}
      />
      <label htmlFor="calories">Calories:</label>
      <input
        type="number"
        id="calories"
        value={formState.calories.value}
        onChange={onCalorieChangeHandler}
        className={`${styles["form-input"]} ${
          !isCalorieValid ? styles.error : ""
        }`}
      />
      <div className={styles.footer}>
        <button disabled={!isFormValid}>Add Record</button>
        <button
          type="button"
          className={styles.secondary}
          onClick={onCancelHandler}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
export default CaloriesRecordEdit;
