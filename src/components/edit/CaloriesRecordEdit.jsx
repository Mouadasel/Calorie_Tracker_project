import { useContext, useEffect, useMemo, useReducer, useRef } from "react";
import styles from "./CaloriesRecordEdit.module.css";
import { AppContext } from "../../AppContext";
import FormInput from "../common/FormInput";
import Button from "../common/Button";
import { useCallback } from "react";

const DEFAULT_VALUE = {
  meal: true,
  content: false,
  calories: false,
};
function formReducer(state, action) {
  const { key, value, auxValue } = action;
  let valid;
  switch (key) {
    case "content":
      valid =
        (value === "sport" && auxValue < 0) ||
        (value !== "sport" && auxValue >= 0);
      return {
        ...state,
        content: !!value,
        calories: valid,
      };

    case "calories":
      valid =
        (auxValue === "sport" && value < 0) ||
        (auxValue !== "sport" && value >= 0);
      return {
        ...state,
        calories: valid,
      };
    default:
      valid = !!value;
      return {
        ...state,
        meal: !!value,
      };
  }
}

function CaloriesRecordEdit(props) {
  const {
    currentDate,
    currentDateStr,
    isValidDate,
    setCurrentDate,
    totalCalories,
  } = useContext(AppContext);
  const [formState, dispatchFn] = useReducer(formReducer, DEFAULT_VALUE);
  const contentRef = useRef();
  const mealRef = useRef();
  const caloriesRef = useRef();
  const { content: isContentValid, calories: isCalorieValid } = formState;

  const isFormValid = useMemo(() => {
    return isValidDate && isContentValid && isCalorieValid;
  }, [isValidDate, isContentValid, isCalorieValid]);
  useEffect(() => {
    contentRef.current.focus();
  }, [isContentValid]);

  const onDateChangeHandler = (event) => {
    setCurrentDate(event.target.value);
  };
  const onMealBlurHandler = (event) => {
    dispatchFn({
      key: "meal",
      value: event.target.value,
    });
  };
  const onContentBlurHandler = (event) => {
    dispatchFn({
      key: "content",
      value: event.target.value,
      auxValue: Number(caloriesRef.current.value),
    });
  };
  const onCalorieBlurHandler = (event) => {
    dispatchFn({
      key: "calories",
      value: Number(event.target.value),
      auxValue: contentRef.current.value,
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onFormSubmit({
      date: currentDate,
      meal: mealRef.current.value,
      content: contentRef.current.value,
      calories: Number(caloriesRef.current.value),
    });
  };
  const onCancelHandler = useCallback(() => {
    props.onCancel();
  }, [isFormValid]);

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <p className={styles.warning}>You spent {totalCalories} calories</p>
      <FormInput
        type="date"
        id="date"
        value={currentDateStr}
        onChange={onDateChangeHandler}
        isValid={isValidDate}
        label="Date"
      ></FormInput>
      <FormInput
        type="select"
        id="meal"
        onBlur={onMealBlurHandler}
        ref={mealRef}
        isValid
        label="Meal"
      >
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </FormInput>
      <FormInput
        type="text"
        id="content"
        label="Content"
        onBlur={onContentBlurHandler}
        isValid={isContentValid}
        ref={contentRef}
      ></FormInput>
      <FormInput
        type="number"
        id="calories"
        label="Calories"
        onBlur={onCalorieBlurHandler}
        isValid={isCalorieValid}
        ref={caloriesRef}
      ></FormInput>

      <div className={styles.footer}>
        <Button variant="primary" disabled={!isFormValid}>
          Add Record
        </Button>
        <Button type="button" variant="secondary" onClick={onCancelHandler}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
export default CaloriesRecordEdit;
