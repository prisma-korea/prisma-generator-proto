import Form from "../components/Form";
import React from "react";
import Table from "../components/Table";
import styles from "../styles/DataScreen.module.css";
import { useCountry } from "@prisma-generator-proto/example-prisma/dist/__generated__/hooks";

const Countries = () => {
  const [countries, addHandler, values, setValues] = useCountry();

  return (
    <div className={styles.screen}>
      <Form
        name='Country'
        onSubmit={addHandler}
        keys={["name", "continentId"]}
        values={values}
        setValues={setValues}
      />

      <Table
        name='Country'
        entries={countries}
        keys={["id", "name", "continentId"]}
      />
    </div>
  );
};

export default Countries;
