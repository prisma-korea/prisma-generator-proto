import React, { useState, useEffect } from "react";

type FormData = {
  [k: string]: string | number;
};

const useEntriesAndValues = <T extends FormData>(
  entryName: string,
  initialValues: Omit<T, "id">
) => {
  const [entries, setEntries] = useState<T[]>([]);
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    fetch(`/api/${entryName}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => setEntries(json));
  }, [setEntries]);

  const addHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    fetch("/api/country", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((json: T) => {
        setEntries([...entries, json]);
      })
      .catch(() => alert("Country could not be created"))
      .finally(() => {
        setValues(initialValues);
      });
  };

  return [entries, addHandler, values, setValues] as const;
};

export default useEntriesAndValues;
