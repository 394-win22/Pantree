import "./App.css";
import React from "react";
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
    <button type="button" onClick={() => alert("double click")}>
      Click Me
    </button>
  </>
);

const App = () => (
  <div>
    <h1>{grocery.title}</h1>
    <FoodList foods={grocery.foods} />
    <AddButton />
  </div>
);

export default App;
