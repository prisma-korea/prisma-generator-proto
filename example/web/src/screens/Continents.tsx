import React, { useState, useEffect } from "react";
import styles from "../styles/Table.module.css";

type Continent = {
  id: string;
  name: string;
};

const Continents = () => {
  const [continents, setContinents] = useState<Continent[]>([]);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    fetch("/api/continent", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => setContinents(json));
  }, [setContinents]);

  const addHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const body = {
      name,
    };

    fetch("/api/continent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((json: Continent) => {
        setContinents([...continents, json]);
        setName("");
      });
  };

  return (
    <div className={styles.container}>
      <div>
        <h1>Continents</h1>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Continent ID</th>
              <th>Continent Name</th>
            </tr>
          </thead>
          <tbody>
            {continents.map((continent) => (
              <tr key={continent.id}>
                <td>{continent.id}</td>
                <td>{continent.name}</td>
              </tr>
            ))}
          </tbody>
          <tfoot></tfoot>
        </table>

        <form className={styles.form} onSubmit={addHandler}>
          <h1>Add Continent</h1>
          <input
            placeholder='continent name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input type='submit' value='Add' />
        </form>
      </div>
    </div>
  );
};

export default Continents;
