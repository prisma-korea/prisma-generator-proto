import React from "react";
import styles from "../styles/Form.module.css";

type FormData = {
  [k: string]: string | number;
};

type Props<T extends FormData> = {
  name: string;
  onSubmit: React.FormEventHandler;
  keys: (keyof T)[];
  values: T;
  setValues: React.Dispatch<React.SetStateAction<T>>;
};

const Form = <T extends FormData>({
  name,
  onSubmit,
  keys,
  values,
  setValues,
}: Props<T>) => {
  return (
    <div className={styles.container}>
      <h2>Add {name}</h2>

      <form className={styles.form} onSubmit={onSubmit}>
        {keys.map((key) => (
          <div className={styles.input} key={key.toString()}>
            <label>{key}</label>
            <input
              value={values[key]}
              onChange={(e) =>
                setValues((original) => ({
                  ...original,
                  [key]: e.target.value,
                }))
              }
            />
          </div>
        ))}
        <input className={styles.submit} type='submit' value='ADD' />
      </form>
    </div>
  );
};

export default Form;
