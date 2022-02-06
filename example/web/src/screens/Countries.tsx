import Form from "../components/Form";
import React from "react";
import Table from "../components/Table";
import styles from "../styles/DataScreen.module.css";
import { useCountry } from "@prisma-generator-proto/example-prisma/dist/__generated__/hooks";

const Countries = () => {
  const [countries, addHandler, formState, setFormState] = useCountry();

  return (
    <div className={styles.screen}>
      <Form
        name="Country"
        keys={["name", "population", "continentId"]}
        onSubmit={addHandler}
        state={formState}
        setState={setFormState}
      />

      <Table
        name="Country"
        list={countries}
        keys={["id", "name", "population", "continentId"]}
      />
    </div>
  );
};

export default Countries;
