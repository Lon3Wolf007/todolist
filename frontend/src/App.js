import React, { useState, useEffect } from "react";
import axios from "axios";
import styled, { createGlobalStyle } from "styled-components";
import TodoList from "./components/TodoList";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, #ff9a9e, #fad0c4);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }
`;

const Container = styled.div`
  width: 400px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Title = styled.h1`
  color: #ff4b5c;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  border: 2px solid #ff4b5c;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background: #ff4b5c;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 5px;
  &:hover {
    background: #e63946;
  }
`;

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error(error));
  }, []);

  const addTodo = () => {
    if (!task.trim()) return;
    axios.post("http://localhost:5000/api/todos", { task })
      .then((response) => setTodos([...todos, response.data]))
      .catch((error) => console.error(error));
    setTask("");
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>To-Do List</Title>
        <Input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task..."
        />
        <Button onClick={addTodo}>Add</Button>
        <TodoList todos={todos} setTodos={setTodos} />
      </Container>
    </>
  );
}

export default App;
