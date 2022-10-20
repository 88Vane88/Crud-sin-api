import React, { useState } from "react";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";

const initialDb = [
  {
    id: 1,
    name: "Robb Stark",
    home: "Stark",
  },
  {
    id: 2,
    name: "Jon Snow",
    home: "Stark",
  },
  {
    id: 3,
    name: "Sansa Stark",
    home: "Stark",
  },
  {
    id: 4,
    name: "Cersei Lannister",
    home: "Lannister",
  },
  {
    id: 5,
    name: "Jaime Lannister",
    home: "Lannister",
  },
  {
    id: 6,
    name: "Tywin Lannister",
    home: "Lannister",
  },
  {
    id: 7,
    name: "Viserys Targaryen",
    home: "Targaryen",
  },
  {
    id: 8,
    name: "Daenerys Targaryen",
    home: "Targaryen",
  },
  {
    id: 9,
    name: "Rhaegar Targaryen",
    home: "Targaryen",
  },
  {
    id: 10,
    name: "Robert Baratheon",
    home: "Baratheon",
  },
  {
    id: 11,
    name: "Stannis Baratheon",
    home: "Baratheon",
  },
];

export default function CrudApp() {
  const [db, setDb] = useState(initialDb);
  const [dataToEdit, setDataToEdit] = useState(null);

  const createData = (data) => {
    data.id = Date.now();
    setDb([...db, data]);
  };

  const updateData = (data) => {
    let newData = db.map((el) => (el.id === data.id ? data : el));
    setDb(newData);
  };

  const deleteData = (id) => {
    let isDelete = window.confirm(
      //es una prop como el alert
      `¿Está seguro que desea borrar el registro ${id}?`
    );

    if (isDelete) {
      let newData = db.filter((el) => el.id !== id);
      setDb(newData);
    } else {
      return;
    }
  };

  return (
    <>
      <div>
        <h2>Crud sin API</h2>
        <article className="grid-1-2">
          <CrudForm
            createData={createData}
            updateData={updateData}
            dataToEdit={dataToEdit}
            setDataToEdit={setDataToEdit}
          />
          <CrudTable
            data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        </article>
      </div>
    </>
  );
}
