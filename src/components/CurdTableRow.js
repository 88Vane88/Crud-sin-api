import React from "react";

export default function CrudTbleRow({ el, setDataToEdit, deleteData }) {
  let { name, home, id } = el;

  return (
    <tr>
      <td>{name}</td>
      <td>{home}</td>
      <td>
        <button onClick={() => setDataToEdit(el)}>Editar</button>
        <button onClick={() => deleteData(id)}>Eliminar</button>
      </td>
    </tr>
  );
}
