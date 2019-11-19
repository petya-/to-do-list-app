import React from "react";
import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="flex flex-row">
          <TodoList />
        </div>
      </header>
    </div>
  );
}

export default App;
