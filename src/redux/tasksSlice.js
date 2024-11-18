// // // import { createSlice } from '@reduxjs/toolkit';

// // // const initialState = [];

// // // const tasksSlice = createSlice({
// // //   name: 'tasks',
// // //   initialState,
// // //   reducers: {
// // //     addTask: (state, action) => {
// // //       state.push(action.payload);
// // //     },
// // //     editTask: (state, action) => {
// // //       const { id, updatedTask } = action.payload;
// // //       const index = state.findIndex((task) => task.id === id);
// // //       if (index !== -1) {
// // //         state[index] = { ...state[index], ...updatedTask };
// // //       }
// // //     },
// // //     deleteTask: (state, action) => {
// // //       return state.filter((task) => task.id !== action.payload);
// // //     },
// // //   },
// // // });

// // // export const { addTask, editTask, deleteTask } = tasksSlice.actions;

// // // export default tasksSlice.reducer;
// // // src/redux/tasksSlice.js
// // import { createSlice } from '@reduxjs/toolkit';

// // const initialState = [];

// // const tasksSlice = createSlice({
// //   name: 'tasks',
// //   initialState,
// //   reducers: {
// //     // Action to add a new task
// //     addTask: (state, action) => {
// //       state.push(action.payload); // Push new task into state
// //     },
// //     // Action to edit an existing task
// //     editTask: (state, action) => {
// //       const { id, updatedTask } = action.payload;
// //       const taskIndex = state.findIndex(task => task.id === id);
// //       if (taskIndex !== -1) {
// //         state[taskIndex] = { ...state[taskIndex], ...updatedTask }; // Update task
// //       }
// //     },
// //     // Action to delete a task
// //     deleteTask: (state, action) => {
// //       return state.filter(task => task.id !== action.payload); // Filter out the task to delete
// //     },
// //   },
// // });

// // export const { addTask, editTask, deleteTask } = tasksSlice.actions;
// // export default tasksSlice.reducer;
// import { createSlice } from '@reduxjs/toolkit';

// // Initial state
// const initialState = [];

// // Create slice
// const tasksSlice = createSlice({
//   name: 'tasks',
//   initialState,
//   reducers: {
//     // Add task
//     addTask: (state, action) => {
//       state.push(action.payload);  // Add the new task to the array
//     },
//     // Edit task
//     editTask: (state, action) => {
//       const { id, updatedTask } = action.payload;
//       const taskIndex = state.findIndex((task) => task.id === id);
//       if (taskIndex !== -1) {
//         state[taskIndex] = { ...state[taskIndex], ...updatedTask };  // Update task with new data
//       }
//     },
//     // Delete task
//     deleteTask: (state, action) => {
//       return state.filter((task) => task.id !== action.payload);  // Remove the task from the array
//     },
//   },
// });

// // Export actions
// export const { addTask, editTask, deleteTask } = tasksSlice.actions;

// // Export reducer
// export default tasksSlice.reducer;
// redux/tasksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);  // Add new task
    },
    editTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const taskIndex = state.findIndex((task) => task.id === id);
      if (taskIndex >= 0) {
        state[taskIndex] = { ...state[taskIndex], ...updatedTask };
      }
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);  // Remove task by id
    },
  },
});

export const { addTask, editTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
