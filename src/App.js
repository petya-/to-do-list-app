import React from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import styled from "styled-components";

function App() {
  return (
    <Container>
      <TodoList />
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 250px;
  margin: 10px auto;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
