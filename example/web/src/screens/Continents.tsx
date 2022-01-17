import React, { useState, useEffect } from "react";

type Continent = {
  id: string;
  name: string;
};

const Continents = () => {
  const [continents, setContinents] = useState<Continent[]>([]);

  useEffect(() => {
    fetch("/continent", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => setContinents(json));
  }, [setContinents]);

  return (
    <div>
      <h1>Continents</h1>
      <table>
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
    </div>
  );
};

export default Continents;
