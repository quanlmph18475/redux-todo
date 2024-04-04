import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todoSlice from './todoSlice';

const store = configureStore({
  reducer: combineReducers({
    todos: todoSlice,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;