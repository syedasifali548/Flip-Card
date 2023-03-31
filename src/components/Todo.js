import { ContactMailSharp } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "../App.css";

const Todo = () => {
  const[todos,setTodos] = useState([])
  const[inputvalues,setInputvalues] = useState("")
  const [editingindex,setEditingindex] = useState(null)
  // Add todos
  const handleAddtodo=()=>{
    setTodos([...todos,inputvalues])
    if(inputvalues && todos < 1){
      return(
       alert("Can not add empty field")
      )
     }
    setInputvalues("")
  }
  // Delete Todos Item 

  const handleDeleteTodo=(index)=>{
    const newTodos = [...todos];
    newTodos.splice(index,1);
    setTodos(newTodos)
  }

  // Edit an Todo item
const handleEditTodo=(index,value)=>{
    setInputvalues(value);
    setEditingindex(index)
}
// Add Or Update Todo

const handleAddOrUpdateTodo=()=>{
  if(editingindex !== null){
    const newUpdateTodo = [...todos];
    newUpdateTodo[editingindex] = inputvalues;
    setTodos(newUpdateTodo);
    setInputvalues('');
    setEditingindex(null)
  }
  else{
    setTodos([...todos,inputvalues])
    setInputvalues('');

  }
}


// Delete All
const handleDeleteAll=()=>{
  setTodos([])
}

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img
              src="https://cdn.iconscout.com/icon/premium/png-256-thumb/todo-list-1540192-1305387.png"
              alt="image"
            />
            <figcaption>Create Your ToDo List</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add items"
              required
              value={inputvalues}
              onChange={(e)=>setInputvalues(e.target.value)}
            
            />
            <div className="addItems" onClick={handleAddOrUpdateTodo}>
            {
              editingindex !== null ? ( <i className="fa fa-edit add-btn"></i>):
              (<i className="fa fa-plus add-btn"></i>)
            }
           
            </div>
          </div>
          <div className="showItems">
          {
            todos.map((todo,index)=>(
              <div className="eachItem" key={index}>
              <h3>{todo}</h3>
              <i
              onClick={()=>handleEditTodo(index,todo)}
                className="fa fa-edit add-btn"
                title="Edit Item"></i>
              <i
             onClick={()=>handleDeleteTodo(index)}
                className="fa fa-trash-alt add-btn"
                title="Delete Item"></i>
                </div>
                ))
              }
       

            {/*clear all button */}
          </div>
          <button
          onClick={handleDeleteAll}
            className="btn effect04"
            data-sm-link-text="Remove All"
          >
            <span>CHECK LIST</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Todo;
