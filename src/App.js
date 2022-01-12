import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { useData } from './utilities/firebase.js';

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

const AddButton = ({ grocery }) => (
  <>
    <button
      type="button"
      onClick={() =>
        ReactDOM.render(<MyForm grocery = { grocery } />, document.getElementById("root"))
      }
    >
      Click Me
    </button>
  </>
);

//Update the state with new items and
const updateNback = ({ name, buyDate, expDate, grocery }) => {
  grocery.foods[name] = {
    name: name,
    buyDate: buyDate,
    expDate: expDate,
  };
  ReactDOM.render(<MyForm />, document.getElementById("root"));
};

const MyForm = ({ grocery }) => {
  const [name, setName] = useState("");
  const [buyDate, setbuyDate] = useState("");
  const [expDate, setexpDate] = useState("");

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
          value={buyDate}
          onChange={(e) => setbuyDate(e.target.value)}
        />
      </label>
      <div></div>
      <label>
        The Expiration Date:
        <input
          type="text"
          value={expDate}
          onChange={(e) => setexpDate(e.target.value)}
        />
      </label>
      <p></p>
      <button
        onClick={() =>
          updateNback({ name, buyDate, expDate, grocery })
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

  return (
    <div>
      <h1>{grocery.title}</h1>
      <FoodList foods={ grocery.foods } />
      <AddButton grocery = { grocery }/>
    </div>
  );

};

export default App;
