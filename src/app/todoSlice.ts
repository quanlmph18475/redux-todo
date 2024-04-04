import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}
interface TodoState {
    todos: Todo[];
}

const initialState: TodoState = {
    todos: [],
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.todos = [...state.todos,action.payload];
        },
        // toggleTodo: (state, action: PayloadAction<number>) => {
        //     const todo = state.todos.find(todo => todo.id === action.payload);
        //     if (todo) {
        //         todo.completed = !todo.completed;
        //     }
        // },
        editTodo: (state, action: PayloadAction<Todo>) => {
            const updatedTodo = action.payload;
            const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
            if (index !== -1) {
                state.todos[index] = updatedTodo;
            }
        },
        removeTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
            console.log(state.todos)
        },
        
        
    },
});

export const { addTodo, editTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;

