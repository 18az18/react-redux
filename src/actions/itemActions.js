import * as actions from "./types";
import axios from "axios";

export const setItems = (items) => {
  // const items = [
  //     {
  //         category: 'Drink',
  //         has: [
  //             {
  //                 name: 'cake',
  //                 price: 2,
  //                 url: './cake.png',
  //             },
  //             {
  //                 name: 'pizza',
  //                 price: 3,
  //                 url: './pizza.png',
  //             }
  //         ]
  //     },
  //     {
  //         category: 'Snack',
  //         has: [
  //             {
  //                 name: 'Burger',
  //                 price: 1,
  //                 url: './burger.png',
  //             },
  //             {
  //                 name: 'cake',
  //                 price: 2,
  //                 url: './cake.png'
  //             }
  //         ]
  //     }
  // ];
  return {
    type: actions.SET_ITEMS,
    payload: items,
  };
};

export const fetchItems = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:5000/items")
      .then((res) => {
        console.log("fetching items api: ", res.data);
        dispatch(setItems(res.data));
      })
      .catch((err) => {
        console.log("error message is: ", err);
      });
  };
};

export const setItemsInCategory = (items) => {
  console.log("setting items category to: ", items);
  return {
    type: actions.SET_ITEMS_IN_CATEGORY,
    payload: items,
  };
};

export const fetchItemsInCategory = (category) => {
  return (dispatch) => {
    axios
      .get("http://localhost:5000/items/" + category, {})
      .then((res) => {
        console.log("fetching api items in category: ", res.data);
        dispatch(setItemsInCategory(res.data));
      })
      .catch((err) => {
        console.log("err in fetching items in category: ", err);
      });
  };
};

export const setItemQuantity = (itemId, quantity, subtotal, url) => {
  console.log("setting item: " + itemId + " to have quantity of: " + quantity);
  return {
    type: actions.SET_ITEM_QUANTITY,
    itemId,
    quantity,
    subtotal,
    url,
  };
};

export const clearShoppingCart = () => {
    return {
        type: actions.PATCH_CLEAR_SHOPPING_CART
    }
}
