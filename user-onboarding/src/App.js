import React, { useState } from "react";
import "./styles.css";
import Form from "./components/Form";
import User from "./components/User";

function App() {
  const [user, setUser] = useState([]);
  console.log("user from app", user);

  return (
    <div className="App">
      <h1>User Sign-Up</h1>
      <Form user={user} setUser={setUser} />
      <User user={user} />
    </div>
  );
}

export default App;