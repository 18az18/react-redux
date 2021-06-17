import * as actions from "../actions/types";

const initialState = {
  items: [],
  itemsInCategory: [],
  cart: [
    {
      name: "Burger",
      quantity: 1,
      subtotal: 1,
      url:  "./burger.png",
    },
    {
      name: "cake",
      quantity: 2,
      subtotal: 4,
      url: "./cake.png",
    },
  ],
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case actions.SET_ITEMS_IN_CATEGORY:
      return {
        ...state,
        itemsInCategory: action.payload,
      };
    case actions.SET_ITEM_QUANTITY:
      var exists = false;
      if (action.quantity !== 0) {
        var addedQuantityCart = state.cart.map((item) => {
          if (item.name === action.itemId) {
            item.quantity = action.quantity;
            item.subtotal = action.subtotal;
            exists = true;
          }
          return item;
        });
        if (exists === false) {
          addedQuantityCart = [
            ...state.cart,
            {
              name: action.itemId,
              quantity: action.quantity,
              subtotal: action.subtotal,
              url: action.url
            },
          ];
        }
      }
      return {
        ...state,
        // if quantity is 0, remove that item from the cart, else change the quantity to action.quantity
        cart:
          action.quantity === 0
            ? state.cart.filter((item) => item.name !== action.itemId)
            : addedQuantityCart,
      };
      case actions.PATCH_CLEAR_SHOPPING_CART:
          return {
              ...state,
              cart: []
          }
    default:
      return state;
  }
};

export default itemReducer;
