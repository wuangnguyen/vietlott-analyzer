import React from "react";
import logo from "./logo.svg";
import { Bingo } from "./features/bingo/Bingo";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Bingo />
      </header>
    </div>
  );
}

export default App;
