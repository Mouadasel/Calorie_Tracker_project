import styles from "./FormInput.module.css";
import { forwardRef } from "react";
const FormInput = forwardRef((props, ref) => {
  const { label, id, type, isValid, children, ...rest } = props;
  const inputElement =
    type === "select" ? (
      <select
        type={type}
        id={id}
        className={`${styles["form-input"]} ${!isValid ? styles.error : ""}`}
        ref={ref}
        {...rest}
      >
        {children}
      </select>
    ) : (
      <input
        type={type}
        id={id}
        className={`${styles["form-input"]} ${!isValid ? styles.error : ""}`}
        ref={ref}
        {...rest}
      />
    );
  return (
    <>
      <label htmlFor={id}>{label}:</label>
      {inputElement}
    </>
  );
});

export default FormInput;
