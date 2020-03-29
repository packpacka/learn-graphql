import React from "react";
import "./App.css";
import { config } from "./config";

function App() {
  const handleClick = async () => {
    const res = await fetch(config.baseApiUrl + "/request");
    const data = await res.json();
    console.log(data);
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
