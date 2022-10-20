import React, { useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import Loader from "./Loader";
import Message from "./Message";

export default function CrudApi() {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let api = helpHttp();
  let url = "http://localhost:5000/got";

  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(url)
      .then((res) => {
        // console.log(res);
        if (!res.err) {
          setDb(res);
          setError(null);
        } else {
          setDb(null);
          setError(res);
        }

        setLoading(false);
      });
  }, [url]);

  //-----------------CREATE-POST -----------------------
  const createData = (data) => {
    data.id = Date.now();
    //Se pone el content type, sino no se guarda lo que escribo

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    api.post(url, options).then((res) => {
      console.log(res);
      if (!res.err) {
        setDb([...db, res]);
      } else {
        setError(res);
      }
    });
  };

  //---------------- UPDATE - PUT ------------------------------
  const updateData = (data) => {
    let endPoint = `${url}/${data.id}`; //lo concateno
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.put(endPoint, options).then((res) => {
      if (!res.err) {
        let newData = db.map((el) => (el.id === data.id ? data : el));
        setDb([...db, res]);
        setDb(newData);
      } else {
        setError(res);
      }
    });
  };
  //----------------DELETE-DEL -----------------------------------
  const deleteData = (id) => {
    let isDelete = window.confirm(
      //es una prop como el alert
      `¿Está seguro que desea borrar el registro ${id}?`
    );

    if (isDelete) {
      let endPoint = `${url}/${id}`; //lo concateno
      let options = {
        headers: { "content-type": "application/json" },
      };
      api.del(endPoint, options).then((res) => {
        if (!res.err) {
          let newData = db.filter((el) => el.id !== id);
          setDb(newData);
        } else {
          setError(res);
        }
      });
    } else {
      return;
    }
  };

  return (
    <>
      <div>
        <h2>Crud con fake API</h2>
        <article className="grid-1-2">
          <CrudForm
            createData={createData}
            updateData={updateData}
            dataToEdit={dataToEdit}
            setDataToEdit={setDataToEdit}
          />
          {loading && <Loader />} {/* SI ES TRUE EJECUTA LOADING */}
          {error && (
            <Message
              msg={`Error ${error.status} : ${error.statusText}`}
              bgColor="#dc3545"
            />
          )}{" "}
          {/* SI HAY ERROR TIRÁ ESTE MENSAJE */}
          {db && (
            <CrudTable
              data={db}
              setDataToEdit={setDataToEdit}
              deleteData={deleteData}
            />
          )}
        </article>
      </div>
    </>
  );
}
