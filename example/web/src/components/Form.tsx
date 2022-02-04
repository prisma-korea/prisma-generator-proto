import React from "react";
import { FormFields } from "@prisma-generator-proto/example-prisma/dist/__generated__/hooks";
import styles from "../styles/Form.module.css";

type FormData = {
  [k: string]: string | number;
};

type Props<T extends FormData> = {
  name: string;
  onSubmit: React.FormEventHandler;
  fieldsMetaData: FormFields;
  values: T;
  setValues: React.Dispatch<React.SetStateAction<T>>;
};

const Form = <T extends FormData>({
  name,
  onSubmit,
  fieldsMetaData,
  values,
  setValues,
}: Props<T>) => {
  return (
    <div className={styles.container}>
      <h2>Add {name}</h2>

      <form className={styles.form} onSubmit={onSubmit}>
        {fieldsMetaData.map((field) => (
          <div className={styles.input} key={field.name.toString()}>
            <label>{field.name}</label>
            <input
              type={
                field.type === "string"
                  ? "text"
                  : field.type === "boolean"
                  ? "checkbox"
                  : "number"
              }
              value={values[field.name]}
              onChange={(e) =>
                setValues((original) => ({
                  ...original,
                  [field.name]: e.target.value,
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
