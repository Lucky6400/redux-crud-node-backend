import AddTodo from "./components/AddTodo";
import ListTodos from "./components/ListTodos";
import "./App.css";
import { useState } from "react";

const App = () => {
  const [todo, setTodo] = useState({
    task: "",
    isComplete: false,
  });

  return (
    <div style={{height: '100%'}} className="p-lg-5 p-3"> 

      <h2 className="w-100 text-center text-white">Todo App</h2>

      <AddTodo todo={todo} setTodo={setTodo}/>

      <ListTodos setTodo={setTodo}/>

    </div>
  );
};

export default App;
