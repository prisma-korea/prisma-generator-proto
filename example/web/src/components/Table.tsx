import React from "react";
import styles from "../styles/Style.module.css";

type FormData = {
  [k: string]: string | number;
};

type Props<T> = {
  keys: (keyof T)[];
  entries: T[];
};

const Table = <T extends FormData>(props: Props<T>) => {
  const { entries, keys } = props;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {keys.map((key) => (
            <th key={key.toString()}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <tr key={entry.id}>
            {keys.map((key) => (
              <td key={key.toString()}>{entry[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
};

export default Table;
