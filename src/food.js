import React from "react";
import ReactDOM from "react-dom";
import { confirm } from "react-confirm-box";
import { useState,useEffect } from "react";
import { deleteFromFirebase, useUserState } from "./utilities/firebase.js";
import {
    ItemCard,
    ItemImg,
    ItemName,
    PurchaseDate,
    ExpDate,
    DeleteButton,
    EditButton,
  } from "./styles/PantryStyles.js";
import { ToastContainer, toast, Slide } from 'react-toastify';
import { GetPhoto } from "./utilities/firebaseStorage.js";
import { App } from "./App";
import {
  FaCalendar,
  FaClock,
  FaEdit,
  FaTimes,
  FaRegMinusSquare,
  FaEllipsisV,
  FaMinus,
  FaRegTimesCircle,
} from "react-icons/fa";
import { EditMyForm, notification } from "./form.js";

let Milk = GetPhoto("milk.png");

console.log(Milk);

// TODO: Find a way to sort the foods


export const notify = (foods) => {
  if(!foods) {return;}
  var expcount = 0;
  var abtToExp = 0;
  console.log("foodddd" + foods);
  for (const [key, value] of Object.entries(foods)) {
      console.log(`${key}: ${value}`);
      // console.log("head"+Expired(value.expDate));
      if(Expired(value.expDate) === 0){
        expcount = expcount+1;
      }
      if(Expired(value.expDate) === 1){
        abtToExp = abtToExp+1
      }
    }
  notification("expp", `${expcount } expired, ${abtToExp} about to expire`);
}

//const sections = ["Fridge", "Shelf", "Freezer"]

const sections = { F: 'fridge', W: 'freezer', S: 'shelf'};

export const FoodList = ({ foods }) => {
  const [section, setSection] = useState('fridge');
  const foodSections = Object.values(foods).filter(food => food.section === section);
  
  if (!foods) {
    return "";
  }


  const sortedFoods = Object.values(foodSections).sort((a, b) => {
    const diff = new Date(a.expDate).getTime() - new Date(b.expDate).getTime();
    if (diff !== 0){
      return diff;
    }
    else{
      if (a.name > b.name){
        return 1;
      } else {
        return -1;
      }
    }
  });

  

  return (
    
    <div className="food-list">
      <SectionSelector section={section} setSection={setSection}/>

      {

      

      Object.values(sortedFoods).map((food, index) => (
        <Food key={index} food={food} />
      ))
      
      }
    </div>
  );
  
};


const SectionSelector = ({section, setSection}) => (
  <div className="btn-group">
  { 
    Object.values(sections)
      .map(value => <SectionButton key={value} section={value} setSection ={setSection} checked={value === section}/>)
  }
  </div>
);

const SectionButton = ({section, setSection , checked}) => (
  <>
    <input type="radio" id={section} className="btn-check" autoComplete="off"  checked={checked} onChange={() => setSection(section)}/>
    <label class="btn btn-success m-1 p-2" htmlFor={section}>
    { section }
    </label>
  </>
);

const Food = ({ food }) => {
  const [isShown, setIsShown] = useState(false);
  const user = useUserState();
    return(
      <ItemCard 
          color={Expired(food.expDate)}
          //onMouseEnter={() => {setIsShown(true)}}
         // onMouseLeave={() => {setIsShown(false)}}
          onClick={() => editButton({ food , user})}
        //  bg = {MouseEntered(isShown)}
          style = {{  cursor: 'pointer' }}
        >
        <ItemImg src={food.icon}/>
        <ItemName >{
            food.name.length > 10 ?
            food.name.substring(0,10)+"..." :
            food.name
            } {' '}</ItemName>
        
        <PurchaseDate ><FaCalendar size={16} style={{ color: '#989898'}} />&nbsp;&nbsp;{food.buyDate}</PurchaseDate>
        <ExpDate><FaClock size={15} style={{ color: '#989898'}} />&nbsp;&nbsp;{food.expDate}
        </ExpDate> 
      </ItemCard>
     )
  };

  const editButton = async ({food, user}) => {

    deleteFromFirebase(food, user);
    //Notification('edit');
    ReactDOM.render(<EditMyForm date = {food.buyDate} exp = {food.expDate} n = {food.name}/>, document.getElementById("root"));
    
    return;
  };

// return different numbers depending on expiration status
export const Expired = (a) => {
  const today = new Date().toISOString().substring(0, 10);
  const diff = numDaysBetween(new Date(a), new Date(today));
  if (diff < 0) {
    // expired
    
    return 0;
  } else if (diff <= 3 && diff >= 0) {
    // expiring soon (within 3 days)
    return 1;
  } else {
    // not gonna expire soon
    return 2;
  }
};

// to calculate the number of days between
// d1: expiration date for the food item
// d2: today's date

const numDaysBetween = (d1, d2) => {
  const diff = d1.getTime() - d2.getTime();
  return diff / (1000 * 60 * 60 * 24);
};
