import { useState, useEffect } from 'react';

import './App.css'
import { CreateTodo } from "./components/CreateTodo"
import { Todos } from "./components/Todos"

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getTodos() {
      const res = await fetch("http://localhost:4999/todo");
      const json = await res.json();
      setTodos(json);
    }
    getTodos();
  }, []);

  return (
    <div className="app-container">
      <div className="create-todo-container">
        <h1>Add a Todo</h1>
        <CreateTodo setTodos={setTodos}></CreateTodo>
      </div>
      <div className="todos-container">
        <h1>Your Todos</h1>
        <Todos todos={todos} setTodos={setTodos}></Todos>
      </div>
    </div>
  )
}

export default App
