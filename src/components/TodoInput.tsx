import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addTodo } from "../redux/todoSlice";

const TodoInput: React.FC = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleAdd = () => {
    if (!name.trim()) return;
    dispatch(addTodo(name));
    setName("");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter new todo"
        style={{ flex: 1, padding: "10px", fontSize: "16px" }}
      />
      <button onClick={handleAdd} style={{ padding: "10px 20px", marginLeft: "10px" }}>
        Add
      </button>
    </div>
  );
};

export default TodoInput;
