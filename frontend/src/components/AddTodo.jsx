import "../App.css";
import {useDispatch, useSelector} from "react-redux"
import { todosAdd, updateTodos } from "../features/taskSlice";

const AddTodo = ({todo, setTodo}) => {

  const dispatch = useDispatch();
  const todoState =  useSelector((state)=> state.taskState)
  console.log(todoState);
 

  const handleSubmit = (e) => {
    e.preventDefault();

    if(todo._id){ //! if id of todo exists then update the todo else add a new one
      dispatch(updateTodos(todo))
    }else{
      const newTodo = {
        ...todo,
        date: new Date()
      }
      dispatch(todosAdd(newTodo))
    }

    alert(JSON.stringify(todo))

    setTodo({
      task: "",
      isComplete: false,
    });
  };

  return (
    <>
      <form className="container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a task"
          className="form-control"
          value={todo.task}
          onChange={(e) => setTodo({ ...todo, task: e.target.value })}
        />
        <br />
        <button className="btn btn-success bg-gradient fw-bold w-100">{todo._id? "Update Task": "Add Task"}</button>



        {todoState.addTodoStatus === "rejected"? (
          <div className="alert alert-danger">Error</div>
        ):null}
        {todoState.addTodoStatus === "fulfilled"?(
          <div className="alert alert-success">Success</div>
        ):null}
        {todoState.updateTodoStatus === "rejected"? (
          <div className="alert alert-danger">Error</div>
        ):null}
        {todoState.updateTodoStatus === "fulfilled"?(
          <div className="alert alert-success">Success</div>
        ):null}



      </form>
    </>
  );
};

export default AddTodo;
