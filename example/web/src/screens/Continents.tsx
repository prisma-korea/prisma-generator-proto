import Form from "../components/Form";
import React from "react";
import Table from "../components/Table";
import styles from "../styles/DataScreen.module.css";
import { useContinent } from "@prisma-generator-proto/example-prisma/dist/__generated__/hooks";

const Continents = () => {
  const [continents, addHandler, formState, setFormState] = useContinent();

  return (
    <div className={styles.screen}>
      <Form
        name="Continent"
        keys={["name"]}
        onSubmit={addHandler}
        state={formState}
        setState={setFormState}
      />

      {continents.length > 0 && (
        <Table name="Continent" list={continents} keys={["id", "name"]} />
      )}
    </div>
  );
};

export default Continents;
