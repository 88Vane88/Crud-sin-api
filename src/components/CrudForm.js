import React, { useState, useEffect } from "react";

const initialForm = {
  name: "",
  lastname: "",
  home: "",
  id: null,
};

export default function CrudForm({
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
}) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    //conectamos click de editar
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.home) {
      alert("Datos requeridos");
      return;
    }
    if (form.id === null) {
      createData(form);
    } else {
      updateData(form);
    }
    handleReset();
  };
  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  return (
    <div>
      <h3>{dataToEdit ? "Editar" : "Agregar"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={form.name}
          type="text"
          name="name"
          placeholder="Nombre"
        />
        <input
          onChange={handleChange}
          value={form.home}
          type="text"
          name="home"
          placeholder="Casa"
        />
        <br />
        <input type="submit" value="Enviar" />
        <input onClick={handleReset} type="reset" value="Limpiar" />
      </form>
    </div>
  );
}
