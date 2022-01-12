import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { useData } from './utilities/firebase.js';

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
  <div className="card m-1 p-2">
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
        //ReactDOM.render(<MyForm />, document.getElementById("root"))
        updateNback()
      }
    >
      Click Me
    </button>
  </>
);

//Update the state with new items and
const updateNback = () => {
  grocery.foods["orange"] = {
    name: "orange",
    buyDate: "Jan 11",
    expDate: "Jan 15",
  };
  ReactDOM.render(<MyForm />, document.getElementById("root"));
};

const MyForm = () => {
  const [name, setName] = useState("");

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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <div></div>
      <label>
        The Expiration Date:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <p></p>
      <button
        onClick={() =>
          ReactDOM.render(<App />, document.getElementById("root"))
        }
      >
        Enter
      </button>
    </form>
  );
};

const App = () => {

  const [grocery, loading, error] = useData('/'); 
  
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>

    return(
    <div>
        <h1>{grocery.title}</h1>
        <FoodList foods={grocery.foods} />
        <AddButton />
      </div>
    );
  
  };

export default App;
