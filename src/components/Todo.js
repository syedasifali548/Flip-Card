import React, { useEffect, useState } from "react";
import "../App.css";

// to get the data from localstorage
const getLocalData = () => {
  const lists = localStorage.getItem("todoList");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};
const Todo = () => {
  const [inputdata, setInputdata] = useState("");
  const [item, setItem] = useState(getLocalData);
  const [itemEdit, setItemEdit] = useState("");
  const [toggle, setToggle] = useState(false);

  // Add new data to todo List
  const addItem = () => {
    if (!inputdata) {
      alert("You can add empty data");
    } else if (inputdata && toggle) {
      setItem(
        item.map((cElem) => {
          if (cElem.id === editItem) {
            return { ...cElem, names: inputdata };
          }
          return cElem;
        })
      );
      setInputdata("");
      setItemEdit(null);
      setToggle(false);
    } else {
      const newInputData = {
        id: new Date().getTime().toString(),
        names: inputdata,
      };
      setItem([...item, newInputData]);
      setInputdata("");
    }
  };
  //    Delete item
  const deleteItem = (i) => {
    const updatedTodoList = item.filter((cElem) => {
      return cElem.id !== i;
    });
    setItem(updatedTodoList);
  };
  //Remove All Items
  const removeAll = () => {
    setItem([]);
  };
  //   add data to local storage
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(item));
  }, [item]);
  // Edit Todo Item
  const editItem = (i) => {
    const editTodoItem = item.find((cElem) => {
      return cElem.id === i;
    });
    setInputdata(editTodoItem.names);
    setItemEdit(i);
    setToggle(true);
  };

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
              value={inputdata}
              onChange={(e) => setInputdata(e.target.value)}
            />
            <i className="fa fa-plus add-btn" onClick={addItem}></i>
          </div>

          <div className="showItems">
            {item?.map((cElem) => {
              return (
                <div className="eachItem" key={cElem?.id}>
                  <h3>{cElem?.names}</h3>
                  <i
                    className="fa fa-edit add-btn"
                    title="Edit Item"
                    onClick={() => editItem(cElem.id)}
                  ></i>
                  <i
                    className="fa fa-trash-alt add-btn"
                    title="Delete Item"
                    onClick={() => deleteItem(cElem.id)}
                  ></i>
                </div>
              );
            })}

            {/*clear all button */}
          </div>
          <button
            className="btn effect04"
            data-sm-link-text="Remove All"
            onClick={removeAll}
          >
            <span>CHECK LIST</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Todo;
