import React, { useState, useEffect } from "react";
import styles from "../styles/Table.module.css";

type Country = {
  id: string;
  name: string;
  continentId: string;
};

const Countries = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  const [name, setName] = useState<string>("");
  const [continentId, setContinentId] = useState<string>("");

  useEffect(() => {
    fetch("/api/country", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => setCountries(json));
  }, [setCountries]);

  const addHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const body = {
      name,
      continentId,
    };

    fetch("/api/country", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((json: Country) => {
        setCountries([...countries, json]);
      })
      .catch(() => alert("Country could not be created"))
      .finally(() => {
        setName("");
        setContinentId("");
      });
  };

  return (
    <div className={styles.container}>
      <div>
        <h1>Countries</h1>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Country ID</th>
              <th>Country Name</th>
              <th>Continent ID</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => (
              <tr key={country.id}>
                <td>{country.id}</td>
                <td>{country.name}</td>
                <td>{country.continentId}</td>
              </tr>
            ))}
          </tbody>
          <tfoot></tfoot>
        </table>

        <form className={styles.form} onSubmit={addHandler}>
          <h1>Add Country</h1>
          <input
            placeholder='country name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder='continent id'
            value={continentId}
            onChange={(e) => setContinentId(e.target.value)}
          />
          <input type='submit' value='Add' />
        </form>
      </div>
    </div>
  );
};

export default Countries;
