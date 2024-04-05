import { useEffect, useState } from 'react';
import { addTodo } from '../../app/todoSlice';
import { useAppDispatch } from '../../hook';

const AddTodo = () => {
    const dispatch = useAppDispatch();
    const initialState = { value: '' };
    const [state, setState] = useState(initialState);

    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            dispatch(addTodo(JSON.parse(savedTodos)));
        }
    }, [dispatch]);

    const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (state.value.trim() !== '') {
            const newTodo = {
                id: Date.now(),
                text: state.value,
                completed: false,
            };
            dispatch(addTodo(newTodo));
            const savedTodos = localStorage.getItem('todos');
            let todos = [];
            if (savedTodos) {
                todos = JSON.parse(savedTodos);
            }
            todos.push(newTodo);
            localStorage.setItem('todos', JSON.stringify(todos));
            setState({ value: '' });
        }
    };

    return (
        <>
            <div className="row-12 d-flex justify-content-center">
                <form onSubmit={handleAdd}>
                    <input
                        type="text"
                        name="name"
                        value={state.value}
                        onChange={(event) => setState({ value: event.target.value })}
                        className="py-2 px-5 m-2 border border-warning text-primary text-center"
                    />
                    <button
                        type="submit"
                        className="btn btn-primary border border-primary justify-content-end py-2 px-3  opacity-75 text-light"
                    >
                        +
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddTodo;