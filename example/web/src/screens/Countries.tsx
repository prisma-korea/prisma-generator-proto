import React from "react";
import Form from "../components/Form";
import Table from "../components/Table";
import useEntriesAndValues from "../useEntriesAndValues";
import styles from "../styles/Style.module.css";

type Country = {
  id: string;
  name: string;
  continentId: string;
};

const INITIAL_VALUES: Omit<Country, "id"> = {
  name: "",
  continentId: "",
};

const Countries = () => {
  const [countries, addHandler, values, setValues] = useEntriesAndValues(
    "country",
    INITIAL_VALUES
  );

  return (
    <div className={styles.container}>
      <div>
        <h1>Countries</h1>

        <Table entries={countries} keys={["id", "name", "continentId"]} />

        <Form
          onSubmit={addHandler}
          keys={["name", "continentId"]}
          values={values}
          setValues={setValues}
        />
      </div>
    </div>
  );
};

export default Countries;
