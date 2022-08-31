import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "Task 1",
    completed: false,
    description: "This is a task",
  },
  {
    id: "2",
    title: "Task 2",
    completed: false,
    description: "This is a task",
  },
];

const userSlice = createSlice({
  name: "tasks",
  // initialState is the default state of the slice. For example with useState [data, setData], data is our initial state.
  initialState,
  // In our reducers we will create function to update the initial state, for example crud operations, get, create, update, delete.
  reducers: {
    // This reducers can be called from any component that uses the slice.
    
    addTask: (state, action) => {
      // In react and redux we usually dont mutate the state or the objects directly, we use methods such as spread operator to copy the state and then mutate the copy.
      // However in redux toolkit we're optimizing code so we can use .push to add a new task to the state.
      state.push(action.payload);
    },
    editTask: (state, action) => {
      const { id, title, description } = action.payload;
      const foundTask = state.find((task) => task.id === id);
      if (foundTask) {
        foundTask.title = title;
        foundTask.description = description;
      }
    },
    deleteTask: (state, action) => {
      const foundTask = state.find((task) => task.id === action.payload);
      if (foundTask) {
        state.splice(state.indexOf(foundTask), 1);
      }
    },
  },
});

// We export the reducers to be used in another component.
export const { addTask, editTask, deleteTask } = userSlice.actions;
export default userSlice.reducer;
