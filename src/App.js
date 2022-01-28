import "./App.css";
import React from "react";
import { useData, useUserState, signInWithG, signOutOfG } from "./utilities/firebase.js";
import { FoodList } from "./food";
import { AddButton } from "./form";
import {
  MainLayout,
  Header,
  H1,
  Content,
  UserName,
} from "./styles/PantryStyles.js";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignInButton = () => (
  <button className="btn"
    onClick={() => signInWithG()}>
    Sign In
  </button>
);

const SignOutButton = ({ cuser }) => (
  <>
    <p className="email">
      {cuser}
      <button className="btn" id="out"
        onClick={() => signOutOfG()}>
        Sign Out
      </button>
    </p>


  </>
);

const currUser = (user) => {
  if (user) {
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
      <ToastContainer transition={Slide} />
      <MainLayout>
        <Header>
          <H1>My Kitchen</H1>
          <div className="signInBtn">
            {user ? <SignOutButton cuser={user.email} /> : <SignInButton />}
          </div>

        </Header>
        <Content>
          {user ? <AddButton /> : ""}
          <H1>{!user ? "Sign In To Unlock Your Kitchen" : ""}</H1>
          {userKitchen ? <FoodList foods={userKitchen.foods} /> : ""}
        </Content>
      </MainLayout>
    </>
  );

};

export default App;
