import React, { useState } from "react";
import "./styles.css";
import "./App.css";
import Form from "./components/Form";
import { Heading } from "./components/Styles"

function App() {

  return (
    <div className="App">
      <Heading>User Sign-Up</Heading>
      <Form />
    </div>
  );
}

export default App;