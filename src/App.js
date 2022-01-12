import "./App.css";
import React from "react";
import ReactDOM from "react-dom";

import { useState } from "react";

let grocery = {
  title: "My Kitchen",
  foods: {
    milk: {
      name: "milk",
      buyDate: "Jan 11",
      expDate: "Jan 15",
    },
    apple: {
      name: "apple",
      buyDate: "Jan 11",
      expDate: "Jan 16",
    },
  },
};

const FoodList = ({ foods }) => (
  <div className="food-list">
    {Object.values(foods).map((food) => (
      <Food food={food} />
    ))}
  </div>
);

const Food = ({ food }) => (
  <div className="card m-1 p-2" onClick = {() => deleteItem( {food} )}>
    <div className="card-body">
      <div className="card-title">{food.name}</div>
      <div className="card-text">{food.buyDate}</div>
      <div className="card-text">{food.expDate}</div>
    </div>
  </div>
);

const AddButton = () => (
  <>
    <button
      type="button"
      onClick={() =>
        ReactDOM.render(<MyForm />, document.getElementById("root"))
      }
    >
      Click Me
    </button>
  </>
);

const deleteItem = ( {food} ) => {
  alert(food.name + " deleted!");
  delete(grocery.foods[food.name]);
  ReactDOM.render(<App />, document.getElementById("root"));
}

//Update the state with new items and
const updateNback = ({ name, buyDate, expDate }) => {
  grocery.foods[name] = {
    name: name,
    buyDate: buyDate,
    expDate: expDate,
  };
  ReactDOM.render(<App />, document.getElementById("root"));
};

const MyForm = () => {
  const [name, setName] = useState("");
  const [buyDate, setbuyDate] = useState("")
  const [expDate, setexpDate] = useState("")

  return (
    <form>
      <label>
        Enter your food:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <div></div>
      <label>
        The Purchase Date:
        <input
          type="text"
          value={ buyDate }
          onChange={(e) => setbuyDate(e.target.value)}
        />
      </label>
      <div></div>
      <label>
        The Expiration Date:
        <input
          type="text"
          value={ expDate }
          onChange={(e) => setexpDate(e.target.value)}
        />
      </label>
      <p></p>
      <button
        onClick={() =>
          updateNback({ name, buyDate, expDate })
        }
      >
        Enter
      </button>
    </form>
  );
};

const App = () => (
  <div>
    <h1>{grocery.title}</h1>
    <FoodList foods={grocery.foods} />
    <AddButton />
  </div>
);

export default App;