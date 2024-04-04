import ListTodo from '../ListTodo/ListTodo'

const Todo = () => {
  return (
    <>
          <div className="w-80 py-5 bg-info opacity-85 px-5">
              <div className="container w-50 p-3 mb-2 bg-white">
                  <h1 className="fw-bold text-center">TODOLIST</h1>
                  <ListTodo />
              </div>
          </div>
    </>
  )
}

export default Todo