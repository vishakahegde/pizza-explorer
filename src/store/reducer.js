// src/store/reducer.js
const initialState = {
  user: {
    name: "Helva",
    favorites: [67283, 357311],
  },
  pizzas: [
    {
      id: 161235,
      name: "Pizza Margherita",
      description:
        "The typical Neapolitan pizza, made with San Marzano tomatoes, mozzarella cheese, fresh basil, salt and extra-virgin olive oil.",
      bought: 5,
      ingredients: ["tomatoes", "mozzarella", "basil", "oil"],
    },
    {
      id: 67283,
      name: "Pizza Napoletana",
      description:
        "Neapolitan pizza also known as Naples-style pizza, is a style of pizza made with tomatoes and mozzarella cheese.",
      bought: 2,
      ingredients: ["tomatoes", "mozzarella", "oil"],
    },
    {
      id: 357311,
      name: "Pizza Bianca",
      description:
        "White pizza, which omits tomato sauce from the equation, often substituting it with pesto or sour cream.",
      bought: 10,
      ingredients: ["ricotta", "mozzarella", "garlic"],
    },
  ],
};

function toggle(list, element) {
  if (list.includes(element)) {
    return list.filter((el) => el !== element);
  } else {
    return [...list, element];
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_FAVORITE_PIZZA": {
      console.log("Action payload ", action.payload);
      const favPizzaIDs = [...state.user.favorites];

      let newFav = [];
      if (favPizzaIDs.includes(action.payload)) {
        newFav = favPizzaIDs.filter((el) => el !== action.payload);
      } else {
        newFav = [...favPizzaIDs, action.payload];
      }

      const newState = {
        ...state,
        user: {
          ...state.user,
          favorites: newFav,
        },
      };

      return newState;

      //Chetan's code
      // const favPizzaIDs = [...state.user.favorites];
      // const fav = favPizzaIDs.find((favPizzaID) => {
      //   if (favPizzaID === action.payload) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // });

      // if (fav === undefined) {
      //   favPizzaIDs.push(action.payload);

      //   const newState = {
      //     ...state,
      //     user: {
      //       ...state.user,
      //       favorites: favPizzaIDs,
      //     },
      //   };
      //   return newState;
      // } else {
      //   const newFavIDs = favPizzaIDs.filter((favID) => {
      //     return favID !== action.payload ? true : false;
      //   });
      //   const newState = {
      //     ...state,
      //     user: {
      //       ...state.user,
      //       favorites: newFavIDs,
      //     },
      //   };
      //   return newState;

      //return state;
    }

    case "ADD_PIZZA": {
      // => Ask yourself: what is action.payload? console log the data
      // console.log("State for ADD_PIZZA ", state);
      // console.log("Action in this case of ADD_PIZZA", action);

      const newPizza = {
        id: action.payload.id,
        name: action.payload.name,
        description: action.payload.description,
        bought: 0,
      };

      return {
        ...state,
        pizzas: [...state.pizzas, newPizza],
      };
      // return {
      //   ...state,
      //   pizzas: [
      //     ...state.pizzas,
      //     {
      //       id: action.payload.id,
      //       name: action.payload.name,
      //       description: action.payload.description,
      //       bought: 0,
      //     },
      //   ],
      // };
    }
    default: {
      return state;
    }
  }
}
