import React, { useEffect, useState } from "react";

interface Todo {
  name: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  const API_URL = "https://code-backend-t2jr.onrender.com/api/todos";

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch todos");
      const data: Todo[] = await res.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Add todo
  const addTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newTodo }),
      });
      if (!res.ok) throw new Error("Failed to add todo");

      setNewTodo("");
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete todo
  const deleteTodo = async (name: string) => {
    try {
      const res = await fetch(API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error("Failed to delete todo");

      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", textAlign: "center" }}>
      <h1>Todo App</h1>

      {/* Input + Add */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
          style={{ flex: 1, padding: "10px", fontSize: "16px" }}
        />
        <button onClick={addTodo} style={{ padding: "10px 20px", marginLeft: "10px" }}>
          Add
        </button>
      </div>

      {/* Todo List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              borderBottom: "1px solid #ccc",
            }}
          >
            {todo.name}
            <button
              onClick={() => deleteTodo(todo.name)}
              style={{ color: "red", border: "none", background: "transparent", cursor: "pointer" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
