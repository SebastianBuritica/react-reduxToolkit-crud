// The first thing we do after setting up our react app is to create a store.

import { configureStore } from "@reduxjs/toolkit";

import tasksReducer from "../features/tasks/tasksSlice";

export const store = configureStore({
  //configureStore returns an object, here we can divide the state of different files.

  // Reducers are functions that take a state and an action, and return a new state. They are some what comparable with the useState hook.
  // To create a reducer we need to import the reducer from the slice file.
  reducer: { tasks: tasksReducer },
});
