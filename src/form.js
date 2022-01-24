import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { pushToFirebase, useUserState } from "./utilities/firebase.js";
import { App } from "./App";
import { MySelection, Food2url } from "./select.js";

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

const MyForm = (param) => {
  var experation = new Date().toISOString().substring(0, 10);
  var today = new Date().toISOString().substring(0, 10);
  var na = "";
  console.log(param.n);

  const [name, setName] = useState(na);
  const [buyDate, setbuyDate] = useState(today);
  const [expDate, setexpDate] = useState(experation);
  const [icon, setIcon] = useState("");
  const [textarea, setTextarea] = useState("Please add a food item.");

  const user = useUserState();

  function stateChange() {
    setTimeout(function () {
      setTextarea("Please add the next item.");
    }, 3000);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !buyDate || !expDate) {
      alert("Please add a all Food Item data");
      return;
    }

    if (new Date(expDate).getTime() - new Date(buyDate).getTime() < 0) {
      alert("Please make sure the expiration date after the buy date");
      return;
    }

    update({ icon, name, buyDate, expDate, user });

    if (name != "") {
      setTextarea("Item added!");
    }

    setName("");
    setbuyDate(today);
    setexpDate(today);
    // wait several seconds and set "item added" back to "please add"
    stateChange();
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
                  ? e.target.value.slice(0, 10) + "..."
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
        <div>
          <MySelection icon={icon} setIcon={setIcon} />
        </div>
        <div className="form-control">
          <textarea value={textarea} onChange={() => setTextarea()} />
        </div>
        <input type="submit" value="Add item" className="btn btn-block" />
        <input type="submit" value="Back" className="btn" onClick={back} />
      </form>
    </div>
  );
};

export const EditMyForm = (param) => {
  var experation = new Date().toISOString().substring(0, 10);
  var today = new Date().toISOString().substring(0, 10);
  var na = "";
  var Editing = new Boolean(false);

  if (param.date !== undefined) {
    today = param.date;
    Editing = new Boolean(true);
  }

  if (param.exp !== undefined) {
    experation = param.exp;
  }

  if (param.n !== undefined) {
    na = param.n;
  }

  console.log(param.n);

  const [name, setName] = useState(na);
  const [buyDate, setbuyDate] = useState(today);
  const [expDate, setexpDate] = useState(experation);
  const [icon, setIcon] = useState("");
  const [textarea, setTextarea] = useState("Please add a food item.");

  const user = useUserState();

  function stateChange() {
    setTimeout(function () {
      setTextarea("Please add the next item.");
    }, 3000);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !buyDate || !expDate) {
      alert("Please add a all Food Item data");
      return;
    }

    if (new Date(expDate).getTime() - new Date(buyDate).getTime() < 0) {
      alert("Please make sure the expiration date after the buy date");
      return;
    }

    update({ icon, name, buyDate, expDate, user });

    if (name != "") {
      setTextarea("Item added!");
    }

    setName("");
    setbuyDate(today);
    setexpDate(today);
    // wait several seconds and set "item added" back to "please add"
    stateChange();

    back();
  };

  console.log(Editing);

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
                  ? e.target.value.slice(0, 10) + "..."
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
          <textarea value={textarea} onChange={() => setTextarea()} />
        </div>
        <input type="submit" value="Finish Editing" className="btn btn-block" />
      </form>
    </div>
  );
};

//Update the state with new items and
const update = ({ icon, name, buyDate, expDate, user }) => {
  // console.log("icon" + Food2url(icon));
  const namex = {
    icon: Food2url(icon),
    name: name,
    buyDate: buyDate,
    expDate: expDate,
  };

  const id = Math.round(Math.random() * 100000);
  const newFood = { id, ...namex };
  pushToFirebase(newFood, user);
};

const back = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};
