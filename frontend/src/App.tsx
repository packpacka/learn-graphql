import React from "react";
import "./App.css";
import { config } from "./config";

function App() {
  const handleClick = async () => {
    const res = await fetch(config.baseApiUrl + "/graphql?", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({ query: "{\n  message\n}", variables: null })
    });
    const {
      data: { message }
    } = await res.json();
    alert(message);
  };
  return (
    <div className="App">
      <h1>Тут что-то будет</h1>
      <h3>Пока не ясно, что именно</h3>
      <button onClick={handleClick}>Кнопка</button>
    </div>
  );
}

export default App;
