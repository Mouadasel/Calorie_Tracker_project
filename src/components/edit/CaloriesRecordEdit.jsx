import { useEffect, useReducer, useState } from "react";
import styles from "./CaloriesRecordEdit.module.css";

const DEFAULT_VALUE = {
  date: { value: "", valid: false },
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
  const [formState, dispatchFn] = useReducer(
    formReducer,
    DEFAULT_VALUE,
    (initialSate) => ({
      ...initialSate,
      date: {
        value: props.currentDate.toISOString().split("T")[0],
        valid: !!props.currentDate,
      },
    })
  );

  const {
    date: { valid: isDateValid },
    content: { valid: isContentValid },
    calories: { valid: isCalorieValid },
  } = formState;

  useEffect(() => {
    console.log({
      isFormValid: isDateValid && isContentValid && isCalorieValid,
    });

    setIsFormValid(isDateValid && isContentValid && isCalorieValid);
  }, [isDateValid, isContentValid, isCalorieValid]);
  const onDateChangeHandler = (event) => {
    dispatchFn({
      type: "UPDATE_FIELD",
      key: "date",
      value: event.target.value,
    });
    props.setCurrentDate(new Date(event.target.value));
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
      value: event.target.value,
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onFormSubmit(
      Object.keys(formState).reduce((aggr, cur) => {
        aggr[cur] = formState[cur].value;
        return aggr;
      }, {})
    );
    dispatchFn({ type: "RESET" });
  };
  const onCancelHandler = () => {
    dispatchFn({ type: "RESET" });
    props.onCancel();
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <label htmlFor="date">Date:</label>
      <input
        type="date"
        id="date"
        value={formState.date.value}
        onChange={onDateChangeHandler}
        className={`${styles["form-input"]} ${
          !isDateValid ? styles.error : ""
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
