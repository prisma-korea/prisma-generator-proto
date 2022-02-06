import React from "react";
import styles from "../styles/Table.module.css";

type List = {
  id: string | number | undefined;
  fields: {
    [key: string]: string | number | boolean | undefined;
  };
}[];

type Props<T extends List> = {
  name: string;
  keys: (keyof T[number]["fields"])[];
  list: T;
};

const Table = <T extends List>({ name, list, keys }: Props<T>) => {
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
          {list.map((entry) => (
            <tr className={styles.entry} key={entry.id}>
              {keys.map((key) => (
                <td key={key.toString()}>{entry["fields"][key]?.toString()}</td>
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
