import React, { useEffect, useState } from "react";
import "./Todo.css";
// import todo from '../images/todo.svg';
const getlocalValue =()=> {
    const lists = localStorage.getItem('list')
    if (lists) {
        return JSON.parse(lists);
    }else { 
        return [];
    }
 }
const Todo = () => {
  const [Items, setItem] = useState(getlocalValue());
  const [inputData, setInputData] = useState("");
  const [isEditItem, setIsEditItem] = useState(null);
  const [toggleBtn, settoggleBtn] = useState(true);


    //remove elements from list 
    const removeAllItems = () => { 
        setItem([])
    }
    //textbox editing
    const Editing = (currId) => {
      const edited_element=Items.find((ele) => {
        return ele.id === currId;
      }) 
      // alert(isEditItem);
      setIsEditItem(currId);
      settoggleBtn(false)
      setInputData(edited_element.name)
      // alert(isEditItem);

    }
    const deleteItem = (currId) => {
        const updatedList = Items.filter((ele) => {
            return ele.id !== currId;
        })
        setItem(updatedList)
    };

     useEffect(() => {
       localStorage.setItem("list", JSON.stringify(Items));
     }, [Items]);
    
// Add Items in TODO List 
  const addItem = () => { 
    if (!inputData) {
      alert("Input is NULL"); 
    }
    else if (inputData && !toggleBtn) {
      setItem(
        Items.map((curr) => {
          if (curr.id === isEditItem) {
            return { ...curr, name: inputData };
          }
          return curr;
        })
      );
      settoggleBtn(true);
      setInputData("");
      
      setIsEditItem(null);
      
    }
    
    else {
      const newData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItem([...Items, newData]);
      console.log(Items);
      setInputData("");
    }
    };
    

  return (
    <div className="main-div">
      <div className="child-div">
        <figure>
          <img src="./images/todo.svg" alt="todo-logo" />
          <figcaption>Add your list here ✌️</figcaption>
        </figure>
        <div className="addItems">
          <input
            placeholder="✍️Add your item"
            className="form-control"
            type="text"
            value={inputData}
            onChange={(event) => setInputData(event.target.value)}
          />
          {toggleBtn ? (
            <i className="fa fa-plus add-btn" onClick={() => addItem()} />
          ) : (
            <i className="fa fa-edit add-btn" onClick={() => addItem()} />
          )}
        </div>

        <div className="showItems">
          {Items.map((currEle) => {
            return (
              <div className="eachItem" key={currEle.id}>
                <h3>{currEle.name}</h3>
                <div className="todo-btn">
                  <i
                    className="far fa-edit add-btn"
                    onClick={() => Editing(currEle.id)}
                  ></i>
                  <i
                    className="far fa-trash-alt add-btn"
                    onClick={() => deleteItem(currEle.id)}
                  ></i>
                </div>

              </div>
            );
          })}
        </div>
        <div className="showItems">
          <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAllItems}>
            <span>CHECK LIST</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
