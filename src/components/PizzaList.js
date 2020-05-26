import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import reducer from "../store/reducer";

const selectUser = (reduxState) => {
  return reduxState.user;
};

const listOfPizzas = (reduxState) => {
  function compare_bought(pizza_a, pizza_b) {
    return pizza_b.bought - pizza_a.bought;
  }
  //do not use reduxState.pizzas directly but make a shalllow clone
  //   reduxState.pizzas.sort(compare_bought);
  //   return reduxState.pizzas;
  const pizzaList = [...reduxState.pizzas];
  return pizzaList.sort(compare_bought);
};

const selectNumberOfPizzas = (state) => {
  return state.pizzas.length;
};

const selectFavouritePizza = (reduxState) => {
  return reduxState.user.favorites;
};

const listOfIngredients = (reduxState) => {
  let allIngredients = [];

  for (let i = 0; i < reduxState.pizzas.length; i++) {
    const temp = [...reduxState.pizzas[i].ingredients];
    allIngredients = allIngredients.concat(temp);
  }

  // https://dev.to/mshin1995/back-to-basics-removing-duplicates-from-an-array-55he
  const ingredients = allIngredients.filter(
    (a, b) => allIngredients.indexOf(a) === b
  );
  console.log("filtered", ingredients);
  return ingredients;
};

export default function PizzaList() {
  const user = useSelector(selectUser);
  const numberOfPizzas = useSelector(selectNumberOfPizzas);
  const pizzas = useSelector(listOfPizzas);
  const favPizzas = useSelector(selectFavouritePizza);
  const ingredients = useSelector(listOfIngredients);
  console.log("ingredients", ingredients);

  const [ingredientSelected, setIngredientSelected] = useState("All");

  const dispatch = useDispatch();
  console.log("ingredientSelected", ingredientSelected);

  return (
    <div>
      <h1>Pizza Explorer</h1>
      <p>
        Welcome back, <strong>{user.name}</strong>! Your favorite pizzas:
      </p>
      <h2>
        Finished only till the Select Ingrideints, no change in pizza list
        implemented
        <br />
        Extra functionality of Redux 1
      </h2>

      <div>
        <p>Select Ingredients below:</p>
        <button
          value="All"
          onClick={(event) => {
            setIngredientSelected(event.target.value);
          }}
        >
          Show all
        </button>
        {ingredients.map((ingredient) => {
          return (
            <button
              value={ingredient}
              onClick={(event) => {
                setIngredientSelected(event.target.value);
              }}
            >
              {ingredient}
            </button>
          );
        })}
      </div>

      <ul>
        {pizzas.map((pizza) => {
          const toggle = () => {
            dispatch({
              type: "TOGGLE_FAVORITE_PIZZA",
              payload: pizza.id,
            });
          };

          const fav = favPizzas.find((favPizzaID) => {
            if (favPizzaID === pizza.id) {
              return true;
            } else {
              return false;
            }
          });

          return (
            <li key={pizza.id}>
              <h3>
                {pizza.name} ({pizza.bought})
              </h3>
              <p>PizzaID: {pizza.id}</p>
              {fav !== undefined ? (
                <button onClick={toggle}>♥</button>
              ) : (
                <button onClick={toggle}>♡</button>
              )}
              <p>{pizza.description}</p>
              <p>Number of times bought: {pizza.bought}</p>
            </li>
          );
        })}
      </ul>
      <p>Number of Pizzas: {numberOfPizzas}</p>
    </div>
  );
}
