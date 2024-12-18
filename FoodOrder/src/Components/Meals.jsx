import React, { useContext } from "react";
import { fetchItems } from "../http";
import { useFetch } from "../hooks/useFetch";
import { CartContext } from "../store/cart-context";
import Meal from "./Meal";
function Meals() {
  
  
  
  const { error, fetchedData: meals } = useFetch(fetchItems, []);
  if (error) {
    return <div>error;</div>;
  }

  return (

    <ul id="meals">
      {meals.map((meal) => (
        <li key={meal.id}>
         <Meal meal={meal}/>
        </li>
      ))}
    </ul>
  );
}

export default Meals;
