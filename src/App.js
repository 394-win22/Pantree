import "./App.css";
import React from "react";
import { useData, useUserState, signInWithG, signOutOfG} from "./utilities/firebase.js";
import { FoodList } from "./food";
import { AddButton } from "./form";
import {
  MainLayout,
  Header,
  H1,
  Content,
  UserName,
} from "./styles/PantryStyles.js";
import { isCompositeComponent } from "react-dom/cjs/react-dom-test-utils.production.min";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignInButton = () => (
  <button className="btn"
      onClick={() => signInWithG()}>
    Sign In
  </button>
);

const SignOutButton = ({cuser}) => (
  <>
  <p className="email">{cuser}</p>

  <button className="btn" id="out"
      onClick={() => signOutOfG()}>
    Sign Out
  </button>
  </>
);

const currUser = (user) =>{
  if(user){
    return "/users/" + user.uid + "/";
  }
  return "/";
}

export const App = () => {

  const user = useUserState();
  const [userKitchen, loading, error] = useData(currUser(user));
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the data...</h1>;

  return (
    <>
      <ToastContainer transition={Slide}/>
      <MainLayout>
        <Header>
          <H1>My Kitchen</H1>
          <div className="signInBtn">
          {user? <SignOutButton cuser={user.email}/>: ""}
        </div>
          
        </Header>

        <Content>
          {!user? <SignInButton /> : ""}
          {userKitchen ? <FoodList foods={userKitchen.foods} /> : ""}
          {user? <AddButton />: ""}
        </Content>
      </MainLayout>
    </>
  );
  
};

export default App;
