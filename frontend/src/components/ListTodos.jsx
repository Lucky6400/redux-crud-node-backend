import "../App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getTodos, deleteTodo } from "../features/taskSlice";
import moment from "moment";

const ListTodos = ({setTodo}) => {

  const dispatch = useDispatch();

  const todoState = useSelector(state => state.taskState)
  const { todos } = todoState;

  useEffect(() => dispatch(getTodos()), [dispatch])

  const handleDelete = (_id) => {
    dispatch(deleteTodo(_id))
  }
  return (
    <>
    <h2 className="w-100 text-white rounded-3 text-center p-2 fw-bold">
    &#11088;  You have {todos && todos.length} tasks &#11088; 
   </h2>
   <h4 className="w-100 text-center fw-bold" >List of Tasks...</h4>
    <div className="todo-container">
     
      {todos.map((items) => (

        <div key={items._id} style={{  borderRadius: "5px"}}  className="col-lg-3 todo-card p-3 mx-3 my-3">

          <h5 className="card-title text-white">

            {items.task}

          </h5>

          <p className="card-description">

            Added: {moment(items.date).fromNow()}

          </p>

          <div className="card-footer">
            <button onClick={()=> setTodo(items)} className="btn btn-dark bg-gradient fw-bold mx-3 my-2">Update Task</button>

          <button onClick={()=> handleDelete(items._id)} className="btn btn-danger bg-gradient fw-bold my-2 mx-3">Delete Task</button>
          </div>
          

        </div>
      ))}


    </div>
    </>
  );
};

export default ListTodos;
