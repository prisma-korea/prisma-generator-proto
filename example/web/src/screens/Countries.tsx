import Form from "../components/Form";
import React from "react";
import Table from "../components/Table";
import styles from "../styles/Style.module.css";
import { useCountry } from "@prisma-generator-proto/example-prisma/dist/__generated__/hooks";

const Countries = () => {
  const [countries, addHandler, values, setValues] = useCountry();

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
