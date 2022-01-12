import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { confirm } from "react-confirm-box";
import { useData } from './utilities/firebase.js';
import { MainLayout, 
        Header, 
        H1, 
        Content, 
        ItemCard, 
        ItemImg, 
        ItemName, 
        PurchaseDate, 
        ExpDate } from './styles/PantryStyles.js'
import MilkPhoto from './utilities/milk.png'

let grocery = {
  title: "My Kitchen",
  foods: {
    Milk: {
      image: "",
      name: "Milk",
      buyDate: "Jan 11",
      expDate: "Jan 15",
    },
    Apple: {
      image: "",
      name: "Apple",
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
  <>
    <ItemCard onClick = {() => deleteButton({ food }) }>
      <ItemImg src={MilkPhoto} />
      <ItemName>{food.name}</ItemName>
      <PurchaseDate>{food.buyDate}</PurchaseDate>
      <ExpDate>{food.expDate}</ExpDate>
    </ItemCard>
  </>
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


const deleteButton = async ({ food }) => {
  const result = await confirm("Are you sure?");
  if (result) {
    delete(grocery.foods[food.name]);
    ReactDOM.render(<App />, document.getElementById("root"));
    return;
  }
};



//Update the state with new items and
const updateNback = ({name, buyDate, expDate}) => {
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
          updateNback({name, buyDate, expDate})
        }
      >
        Enter
      </button>
    </form>
  );
};

const App = () => {

  //const [grocery, loading, error] = useData('/'); 
  
  //if (error) return <h1>{error}</h1>;
  //if (loading) return <h1>Loading the schedule...</h1>

  return(
    <>
        <MainLayout>
            <Header>
                <H1>{grocery.title}</H1>
            </Header>
            <Content>
                <FoodList foods={grocery.foods} />
                <AddButton />
            </Content>
        </MainLayout>
    </>
    );
  
};

export default App;