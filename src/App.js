import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { confirm } from "react-confirm-box";
import { useData, setData } from './utilities/firebase.js';
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
    {Object.values(foods).map((food, index) => (
      <Food key={index} food={food} />
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
      className="btn"
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
const update = ({name, buyDate, expDate}) => {
  const namex = {
    "name": name,
    "buyDate": buyDate,
    "expDate": expDate
  };

  const id = Math.round(Math.random() * 10000)
  const newFood = { id, ...namex }
  pushToFirebase(newFood);  
};

const back = ()=> {
  ReactDOM.render(<App />, document.getElementById("root"));
}

const MyForm = () => {
  const [name, setName] = useState("");
  const [buyDate, setbuyDate] = useState("")
  const [expDate, setexpDate] = useState("")
  
  const onSubmit = (e) => {
    e.preventDefault()

    if (!name || !buyDate || !expDate) {
      alert('Please add a all Food Item data')
      return
    }
    update({name, buyDate, expDate})


    setName('')
    setbuyDate('')
    setexpDate('')

  }

  return (
    <div className="container">
      <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
          <label>Name</label>
          <input
            type='text'
            placeholder='Add Food'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label>Purchase Date</label>
          <input
            type='text'
            placeholder='Purchase Date'
            value={buyDate}
            onChange={(e) => setbuyDate(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label>Expire Date</label>
          <input
            type='text'
            placeholder='Expire Date'
            value={expDate}
            onChange={(e) => setexpDate(e.target.value)}
          />
        </div>

        <input type='submit' value='Add item' className='btn btn-block' />
        <input type='submit' value='Back' className='btn' onClick={back}/>
      </form></div>
  );
};
const App = () => {


  const [groceryy, loading, error] = useData('/'); 
  
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>

  return(
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