import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api/todos";

function App() {
  const [name, setName] = useState("");
  const [todos, setTodos] = useState([]);

  // Fetch todos
  const fetchTodos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add todo
  const addTodo = async () => {
    if (!name) return;

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();
    setTodos(data);
    setName("");
  };

  // Delete todo
  const deleteTodo = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    setTodos(data);
  };

  return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div style={{ textAlign: "center" }}>
      <h2>Todo App</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter todo"
      />
      <button onClick={addTodo}>Add</button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <span>{todo.name}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

}

export default App;
