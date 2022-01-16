import "./App.css";
import React from "react";
import { useData} from "./utilities/firebase.js";
import { FoodList } from "./food";
import { AddButton } from "./form";
import {
  MainLayout,
  Header,
  H1,
  Content,
} from "./styles/PantryStyles.js";
import { isCompositeComponent } from "react-dom/cjs/react-dom-test-utils.production.min";




export const App = () => {

  

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
