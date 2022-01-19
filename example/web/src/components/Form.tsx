import React from "react";
import styles from "../styles/Style.module.css";

type FormData = {
  [k: string]: string | number;
};

type Props<T extends FormData> = {
  onSubmit: React.FormEventHandler;
  keys: (keyof T)[];
  values: T;
  setValues: React.Dispatch<React.SetStateAction<T>>;
};

const Form = <T extends FormData>({
  onSubmit,
  keys,
  values,
  setValues: setValues,
}: Props<T>) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2>Add Continent</h2>

      {keys.map((key) => (
        <input
          key={key.toString()}
          value={values[key]}
          placeholder={key.toString()}
          onChange={(e) =>
            setValues((original) => ({ ...original, [key]: e.target.value }))
          }
        />
      ))}
      <input type='submit' value='Add' />
    </form>
  );
};

export default Form;
