import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import {pushToFirebase} from "./utilities/firebase.js";
import {App} from "./App";

export const AddButton = () => (
    <>
      <button
        type="button"
        className="btn"
        onClick={() =>
          ReactDOM.render(<MyForm />, document.getElementById("root"))
        }
      >
        Add Food
      </button>
    </>
  );

  const MyForm = () => {
    const today = new Date().toISOString().substring(0, 10);
  
    const [name, setName] = useState("");
    const [buyDate, setbuyDate] = useState(today);
    const [expDate, setexpDate] = useState(today);
    const [textarea, setTextarea] = useState(
      "Please add a food item."
    );

    function stateChange() {
      setTimeout(function () {
        setTextarea("Please add the next item.")
      }, 3000);
  }

    const onSubmit = (e) => {
      e.preventDefault();

      if (!name || !buyDate || !expDate) {
        alert("Please add a all Food Item data");
        return;
      }
  
      if (new Date(expDate).getTime() - new Date(buyDate).getTime() < 0){
        alert("Please make sure the expiration date after the buy date");
        return;
      }
  
      update({ name, buyDate, expDate });

      if (name != "") {
        setTextarea("Item added!")
      }
  
      setName("");
      setbuyDate(today);
      setexpDate(today);
      // wait several seconds and set "item added" back to "please add"
      stateChange() 
      
    };
  
    return (
      <div className="container">
        <form className="add-form" onSubmit={onSubmit}>
          <div className="form-control">
            <label>Name</label>
            <input
              type="text"
              placeholder="Add Food"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value.length > 10
                    ? e.target.value.slice(0, 10) +'...'
                    : e.target.value
                )
              }
            />
          </div>
          <div className="form-control">
            <label>Purchase Date</label>
            <input
              type="date"
              placeholder="Purchase Date"
              value={buyDate}
              onChange={(e) => setbuyDate(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>Expire Date</label>
            <input
              type="date"
              placeholder="Expire Date"
              value={expDate}
              onChange={(e) => setexpDate(e.target.value)}
            />
          </div> 
          <div className="form-control">
            <textarea value={textarea}  />
          </div>
          <input type="submit" value="Add item" className="btn btn-block" />
          <input type="submit" value="Back" className="btn" onClick={back} />
        </form>
      </div>
    );
  };

  //Update the state with new items and
const update = ({ name, buyDate, expDate }) => {
    const namex = {
      name: name,
      buyDate: buyDate,
      expDate: expDate,
    };
  
    const id = Math.round(Math.random() * 10000);
    const newFood = { id, ...namex };
    pushToFirebase(newFood);
  };
  
  
  const back = () => {
    ReactDOM.render(<App />, document.getElementById("root"));
  };
  