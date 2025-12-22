import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Todo {
  name: string;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

const API_URL = "https://code-backend-t2jr.onrender.com/api/todos";

// Async thunks
export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data as Todo[];
});

export const addTodo = createAsyncThunk("todos/add", async (name: string) => {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  const res = await fetch(API_URL);
  return res.json() as Promise<Todo[]>;
});

export const deleteTodo = createAsyncThunk("todos/delete", async (name: string) => {
  await fetch(API_URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  const res = await fetch(API_URL);
  return res.json() as Promise<Todo[]>;
});

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchTodos.fulfilled, (state, action) => { state.loading = false; state.todos = action.payload; })
      .addCase(fetchTodos.rejected, (state, action) => { state.loading = false; state.error = action.error.message || "Error"; })

      // Add todo
      .addCase(addTodo.pending, (state) => { state.loading = true; })
      .addCase(addTodo.fulfilled, (state, action) => { state.loading = false; state.todos = action.payload; })
      .addCase(addTodo.rejected, (state, action) => { state.loading = false; state.error = action.error.message || "Error"; })

      // Delete todo
      .addCase(deleteTodo.pending, (state) => { state.loading = true; })
      .addCase(deleteTodo.fulfilled, (state, action) => { state.loading = false; state.todos = action.payload; })
      .addCase(deleteTodo.rejected, (state, action) => { state.loading = false; state.error = action.error.message || "Error"; });
  },
});

export default todoSlice.reducer;
