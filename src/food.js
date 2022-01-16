import React from "react";
import ReactDOM from "react-dom";
import { confirm } from "react-confirm-box";
import {deleteFromFirebase} from "./utilities/firebase.js";
import {
    ItemCard,
    ItemImg,
    ItemName,
    PurchaseDate,
    ExpDate,
  } from "./styles/PantryStyles.js";

import { GetPhoto } from "./utilities/firebaseStorage.js";
import {App} from "./App";
import MilkPhoto from "./utilities/milk.png";

//It is able to get the URL. The problem is making it Async so it can actual be displayed.
//TODO fix PROMISE<Pending>
let Milk = GetPhoto('milk.png');

console.log(Milk);


// TODO: Find a way to sort the foods

export const FoodList = ({ foods }) => {
    const sortedFoods = Object.values(foods).sort((a, b) => {
      return new Date(a.expDate).getTime() - new Date(b.expDate).getTime();
    });
  
    // console.log(typeof sortedFoods[0].expDate);
    return (
      <div className="food-list">
        {Object.values(sortedFoods).map((food, index) => (
          <Food key={index} food={food} />
        ))}
      </div>
    );
  };

const Food = ({ food }) => {
    return(
      <ItemCard onClick={() => deleteButton({ food })}>
        <ItemImg src={MilkPhoto} />
        <ItemName >{food.name}</ItemName>
        <PurchaseDate >{food.buyDate}</PurchaseDate>
        <ExpDate color={Expired(food.expDate)}>
          {food.expDate}
        </ExpDate> 
      </ItemCard>
     )
  };

  const deleteButton = async ({ food }) => {
    const result = await confirm("Are you sure?");
    if (result) {
      deleteFromFirebase(food);
      alert("Item Delection Done!");
      ReactDOM.render(<App />, document.getElementById("root"));
      return;
    }
  };

  // return different numbers depending on expiration status
  const Expired = (a) => {
    const today = new Date().toISOString().substring(0, 10);
    const diff = numDaysBetween(new Date(a),new Date(today))
    if(diff<0){ // expired
      return 0
    }
    else if((diff<=3 && diff >=0)){ // expiring soon (within 3 days)
      return 1
    }
    else{ // not gonna expire soon
      return 2
    }
  }

  
// to calculate the number of days between
// d1: expiration date for the food item
// d2: today's date

  const numDaysBetween = (d1, d2) => {
    const diff = d1.getTime() - d2.getTime();
    return (diff / (1000 * 60 * 60 * 24))
  };