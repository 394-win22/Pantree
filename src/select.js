import React, { useState } from "react";
import SelectSearch, { fuzzySearch } from "react-select-search";
import "./select-search.css";

const icons = [
  {
    name: "default",
    value: "default",
    photo: "https://cdn-icons-png.flaticon.com/512/135/135763.png",
  },
  {
    name: "apple", //what is displayed
    value: "Apple", //what is used by the program
    photo: "https://cdn-icons-png.flaticon.com/512/186/186016.png",
  },
  {
    name: "banana",
    value: "Banana",
    photo: "https://cdn-icons-png.flaticon.com/512/714/714197.png",
  },
  {
    name: "pear",
    value: "Pear",
    photo:
      "https://icons.iconarchive.com/icons/alex-t/fresh-fruit/1024/pear-icon.png",
  },
];

// Given a food name, returns its value in the data base
// TODO: Generalize The Database
export const Food2url = (value) => {
  //   console.log("Looking for " + value);
  for (let i = 0; i < icons.length; i++) {
    if (icons[i].value == value) {
      //   console.log("Found " + value);
      return icons[i].photo;
    }
  }
  return icons[0].photo;
};

// Helper Function for loading the imgs
const renderImg = (props, option, className) => {
  const imgStyle = {
    // borderRadius: "50%",
    verticalAlign: "middle",
    padding: 5,
  };

  // const buttonStyle = {
  //   backgroundColor: "white",
  //   border: 0,
  //   display: "flex",
  // };

  return (
    <button {...props} className={className} type="button" class="button-style">
      <img alt="" style={imgStyle} width="50" height="50" src={option.photo} />
      {option.name}
    </button>
  );
};

// The Selection
// TODO: Give the state control to a higher level
export const MySelection = ({ icon, setIcon }) => {
  // const [icon, setIcon] = useState("");
  //   console.log("Current Icon " + icon);

  return (
    <div class="icon-window">
      {/* <img width="50" src={food2url(icon)}></img> */}
      <img width="50" src={Food2url(icon)}></img>
      <SelectSearch
        className="select-search"
        value={icon}
        onChange={setIcon}
        options={icons}
        search
        placeholder="Choose your icon"
        renderOption={renderImg}
        filterOptions={fuzzySearch}
      />
    </div>
  );
};
