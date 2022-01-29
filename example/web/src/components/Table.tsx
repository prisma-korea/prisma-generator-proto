import React from "react";
import styles from "../styles/Table.module.css";

type FormData = {
  [k: string]: string | number;
};

type Props<T> = {
  name: string;
  keys: (keyof T)[];
  entries: T[];
};

const Table = <T extends FormData>(props: Props<T>) => {
  const { name, entries, keys } = props;

  return (
    <div className={styles.container}>
      <h2>{name} List</h2>
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
            <tr className={styles.entry} key={entry.id}>
              {keys.map((key) => (
                <td key={key.toString()}>{entry[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
};

export default Table;
