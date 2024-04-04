import { useEffect, useState } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import { removeTodo, editTodo } from '../../app/todoSlice';
import { useAppDispatch } from '../../hook';
import { useParams } from 'react-router-dom';

type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

const ListTodo = () => {
    const { id } = useParams();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [editTodoID, setEditTodoID] = useState<number | null>(null);
    const [state, setState] = useState<{ value: string }>({ value: '' });
    const dispatch = useAppDispatch();

    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    const handleCheckboxChange = (id: number) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const handleRemove = (id: number) => {
        dispatch(removeTodo(id));
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const handleEdit = (id: number) => {
        setEditTodoID(id);
    };

    const handleFormSubmit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        if (state && state.value.trim() !== '') {
            const updatedTodo: Todo = {
                id: id,
                text: state.value,
                completed: false,
            };
            dispatch(editTodo(updatedTodo));
            const updatedTodos = todos.map(todo =>
                todo.id === id ? { ...todo, text: state.value } : todo
            );
            setTodos(updatedTodos);
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            setEditTodoID(null);
        }
    };
    const handleRemoveChecked = () => {
        const updatedTodos = todos.filter((todo) => !todo.completed);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };


    return (
        <>
            <AddTodo />
            <br />
            {todos.map((item, index) => (
                <div key={index} className="row shadow-none p-2 mb-5 bg-light rounded">
                    <div className="col-5 px-4 d-flex justify-content-start">
                        {/* Set trạng thái khi click vào edit hiển thị form edit */}
                        {editTodoID === item.id ? (
                            <form onSubmit={(e) => handleFormSubmit(e, item.id)}>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={item.text}
                                    onChange={(e) => setState({ value: e.target.value })}
                                    required
                                />
                                <button className='btn btn-primary' type="submit">Save</button>
                            </form>
                        ) : (
                            <label className="form-check-label text-primary"
                                style={item.completed ? { textDecoration: "line-through" } : undefined}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={item.completed}
                                    onChange={() => handleCheckboxChange(item.id)}
                                    readOnly
                                />
                                {item.text}
                            </label>
                        )}
                        {/* the end */}
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <a className='text-primary' onClick={() => handleEdit(item.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                            </svg>
                        </a>
                        <a className='text-primary' onClick={() => handleRemove(item.id)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor"
                                className="bi bi-x-lg"
                                viewBox="0 0 16 16"
                            >
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                            </svg>
                        </a>
                    </div>
                </div>
            ))}<br />
            <div className="row">
                <div className="col">
                    <div className="text-center py-2 bg-warning">
                        {todos.filter((item) => item.completed).length} of {todos.length} tasks done
                    </div>
                </div>
                <div className="col">
                    <button
                        type="submit"
                        //onClick={handleChecked}
                        onClick={() => handleRemoveChecked()}
                        className="text-center w-100 border border-primary py-2 bg-primary opacity-75 text-light"
                    >
                        Kiểm tra checked <span className="fw-bolder">X</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default ListTodo;