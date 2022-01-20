import Form from "../components/Form";
import React from "react";
import Table from "../components/Table";
import styles from "../styles/Style.module.css";
import { useCountry } from "@prisma-generator-proto/example-prisma/dist/__generated__/hooks";
import useEntriesAndValues from "../useEntriesAndValues";

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
  const countryDummy = useCountry();
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
