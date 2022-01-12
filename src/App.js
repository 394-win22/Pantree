import "./App.css";
import React from "react";
import ReactDOM from "react-dom";

import { useState, useEffect } from "react";

const grocery = {
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
<<<<<<< HEAD
    <button type="button" >
=======
    <button
      type="button"
      onClick={() =>
        ReactDOM.render(<MyForm />, document.getElementById("root"))
      }
    >
>>>>>>> 118d39b4e63424f646a2596dedeb761c5cb1b36d
      Click Me
    </button>
  </>
);

<<<<<<< HEAD
const handleClick = () => (
  <form>
    <label>
      Name:
      <input type="text" name="name" />
    </label>
    <input type="submit" value="Submit" />
  </form>
);
=======
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
    </form>
  );
};
>>>>>>> 118d39b4e63424f646a2596dedeb761c5cb1b36d

const App = () => (
  <div>
    <h1>{grocery.title}</h1>
    <FoodList foods={grocery.foods} />
    <AddButton />
    <handleClick />
  </div>
);

export default App;
