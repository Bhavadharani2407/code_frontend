import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { deleteTodo } from "../redux/todoSlice";

interface Props {
  name: string;
}

const TodoItem: React.FC<Props> = ({ name }) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        borderBottom: "1px solid #ccc",
      }}
    >
      {name}
      <button
        onClick={() => dispatch(deleteTodo(name))}
        style={{ color: "red", border: "none", background: "transparent", cursor: "pointer" }}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
