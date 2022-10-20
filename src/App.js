import React from "react";
import "./App.css";
import CrudApi from "./components/CrudApi";
import CrudApp from "./components/CrudApp";
//instalo  npx json-server --port3001 --watch db.json

function App() {
  return (
    <div>
      <h1>Game of thrones Crud</h1>
      <hr />
      <CrudApi />
      <hr />
      <CrudApp />
    </div>
  );
}

export default App;
