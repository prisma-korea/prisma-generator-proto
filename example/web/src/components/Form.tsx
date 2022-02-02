import React from "react";
import { formFields } from "@prisma-generator-proto/example-prisma/dist/__generated__/hooks";
import styles from "../styles/Form.module.css";

type FormData = {
  [k: string]: string | number;
};

type Props<T extends FormData> = {
  name: string;
  onSubmit: React.FormEventHandler;
  keys: formFields;
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
          <div className={styles.input} key={key.name.toString()}>
            <label>{key.name}</label>
            <input
              type={
                key.type === "string"
                  ? "text"
                  : key.type === "boolean"
                  ? "checkbox"
                  : "number"
              }
              value={values[key.name]}
              onChange={(e) =>
                setValues((original) => ({
                  ...original,
                  [key.name]: e.target.value,
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
