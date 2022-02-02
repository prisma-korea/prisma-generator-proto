import { useContinent } from "@prisma-generator-proto/example-prisma/dist/__generated__/hooks";
import React from "react";
import Form from "../components/Form";
import Table from "../components/Table";
import styles from "../styles/DataScreen.module.css";

const Continents = () => {
  const [continents, addHandler, values, setValues, continentFormFields] =
    useContinent();

  return (
    <div className={styles.screen}>
      <Form
        name='Continent'
        onSubmit={addHandler}
        keys={continentFormFields}
        values={values}
        setValues={setValues}
      />

      {continents.length > 0 && (
        <Table name='Continent' entries={continents} keys={["id", "name"]} />
      )}
    </div>
  );
};

export default Continents;
