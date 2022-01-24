import { useContinent } from "@prisma-generator-proto/example-prisma/dist/__generated__/hooks";
import React from "react";
import Form from "../components/Form";
import Table from "../components/Table";
import styles from "../styles/Style.module.css";

const Continents = () => {
  const [continents, addHandler, values, setValues] = useContinent();

  return (
    <div className={styles.container}>
      <div>
        <h1>Continents</h1>

        {continents.length > 0 && (
          <Table entries={continents} keys={["id", "name"]} />
        )}

        <Form
          onSubmit={addHandler}
          keys={["name"]}
          values={values}
          setValues={setValues}
        />
      </div>
    </div>
  );
};

export default Continents;
