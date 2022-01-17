import React, { useState, useEffect } from "react";

type Country = {
  id: string;
  name: string;
  continentId: string;
};

const Countries = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetch("/country", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => setCountries(json));
  }, [setCountries]);

  return (
    <div>
      <h1>Countries</h1>
      <table>
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
    </div>
  );
};

export default Countries;
