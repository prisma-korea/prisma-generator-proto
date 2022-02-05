import React from "react";
import styles from "../styles/Form.module.css";

type FormElement =
  | {
      type: "string";
      value?: string;
    }
  | {
      type: "number";
      value?: number;
    }
  | {
      type: "boolean";
      value?: boolean;
    };

type FormState = {
  [name: string]: FormElement;
};

type Props<T extends FormState> = {
  name: string;
  onSubmit: React.FormEventHandler;
  keys: (string & keyof T)[];
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
};

function toFormValue(state: FormState, fieldName: string): string | undefined {
  const formElement = state[fieldName];
  if (formElement === undefined || formElement.value === undefined) {
    return undefined;
  }
  switch (formElement.type) {
    case "boolean":
      return fieldName;
    case "number":
      return formElement.value.toString();
    case "string":
      return formElement.value;
  }
}

const Form = <T extends FormState>({
  name,
  onSubmit,
  keys,
  state,
  setState,
}: Props<T>) => {
  return (
    <div className={styles.container}>
      <h2>Add {name}</h2>

      <form className={styles.form} onSubmit={onSubmit}>
        {keys.map(
          (fieldName) =>
            state[fieldName] !== undefined && (
              <div className={styles.input} key={fieldName.toString()}>
                <label>{fieldName}</label>
                <input
                  type={
                    state[fieldName]?.type === "string"
                      ? "text"
                      : state[fieldName]?.type === "boolean"
                      ? "checkbox"
                      : "number"
                  }
                  value={toFormValue(state, fieldName)}
                  onChange={(e) =>
                    setState((original) => {
                      const copy = { ...original };
                      const nextValue =
                        original[fieldName]?.type === "boolean"
                          ? e.target.checked
                          : e.target.value;
                      copy[fieldName] = {
                        ...original[fieldName],
                        value: nextValue,
                      };
                      return copy;
                    })
                  }
                />
              </div>
            )
        )}
        <input className={styles.submit} type="submit" value="ADD" />
      </form>
    </div>
  );
};

export default Form;
