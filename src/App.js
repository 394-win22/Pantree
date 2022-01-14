import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { confirm } from "react-confirm-box";
import { useData, setData } from "./utilities/firebase.js";
import {
  MainLayout,
  Header,
  H1,
  Content,
  ItemCard,
  ItemImg,
  ItemName,
  PurchaseDate,
  ExpDate,
} from "./styles/PantryStyles.js";
import MilkPhoto from "./utilities/milk.png";
import { isCompositeComponent } from "react-dom/cjs/react-dom-test-utils.production.min";

// TODO: Find a way to sort the foods
const FoodList = ({ foods }) => {
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

// to calculate the number of days between
// d1: expiration date for the food item
// d2: today's date
const numDaysBetween = (d1, d2) => {
  const diff = d1.getTime() - d2.getTime();
  return (diff / (1000 * 60 * 60 * 24))
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

const AddButton = () => (
  <>
    <button
      type="button"
      className="btn"
      onClick={() =>
        ReactDOM.render(<MyForm />, document.getElementById("root"))
      }
    >
      Click Me
    </button>
  </>
);

const deleteFromFirebase = async (foodie) => {
  if (foodie) {
    try {
      await setData(`/foods/${foodie.id}/`, null);
    } catch (error) {
      alert(error);
    }
  }
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

const pushToFirebase = async (foodie) => {
  if (foodie) {
    try {
      await setData(`/foods/${foodie.id}/`, foodie);
    } catch (error) {
      alert(error);
    }
  }
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

const MyForm = () => {
  const today = new Date().toISOString().substring(0, 10);

  const [name, setName] = useState("");
  const [buyDate, setbuyDate] = useState(today);
  const [expDate, setexpDate] = useState(today);

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

    setName("");
    setbuyDate("");
    setexpDate("");
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

        <input type="submit" value="Add item" className="btn btn-block" />
        <input type="submit" value="Back" className="btn" onClick={back} />
      </form>
    </div>
  );
};
const App = () => {
  const [groceryy, loading, error] = useData("/");

  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>;

  return (
    <>
      <MainLayout>
        <Header>
          <H1>{groceryy.title}</H1>
        </Header>
        <Content>
          <FoodList foods={groceryy.foods} />
          <AddButton />
        </Content>
      </MainLayout>
    </>
  );
};

export default App;
