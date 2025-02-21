import React from "react";
import styled from "styled-components";
import { FaTrash, FaCheckCircle, FaRegCircle } from "react-icons/fa";
import axios from "axios";

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  background: ${(props) => (props.completed ? "#d4edda" : "#fff3cd")};
  padding: 10px;
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
`;

function TodoList({ todos, setTodos }) {
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch((error) => console.error(error));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <List>
      {todos.map((todo) => (
        <ListItem key={todo.id} completed={todo.completed}>
          <Button onClick={() => toggleComplete(todo.id)}>
            {todo.completed ? <FaCheckCircle color="green" /> : <FaRegCircle color="gray" />}
          </Button>
          <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.task}
          </span>
          <Button onClick={() => deleteTodo(todo.id)}>
            <FaTrash color="red" />
          </Button>
        </ListItem>
      ))}
    </List>
  );
}

export default TodoList;
