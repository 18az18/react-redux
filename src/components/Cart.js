import { useSelector, useDispatch } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import CartItem from "./CartItem";
import { NavLink } from "react-router-dom";
import { clearShoppingCart } from '../actions/itemActions'

const Cart = () => {
  const cart = useSelector((state) => state.items.cart);
  const dispatch = useDispatch();
  let total = 0;
  cart.map((item) => {
    total += item.subtotal;
    return item;
  });
  return (
    <div>
      {!cart.length ? (
        <div>
          <p>Your cart is empty.</p>{" "}
          <NavLink to="/">Click here to go back to shop</NavLink>
        </div>
      ) : (
        cart.map(({ name, quantity, subtotal, url }, index) => (
          <CartItem
            key={index}
            name={name}
            quantity={quantity}
            subtotal={subtotal}
            url={url}
          />
        ))
      )}
      <h4>Total price: {total}</h4>
      {/* visa paymeng goes here */}
      {/* paypal button before submitting the visa payment */}
      <PayPalButton
        amount={total}
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);
          // clear the cart in redux
            dispatch(clearShoppingCart());
          // OPTIONAL: Call your server to save the transaction
          //   return fetch("/paypal-transaction-complete", {
          //     method: "post",
          //     body: JSON.stringify({
          //       orderId: data.orderID,
          //     }),
          //   });
        }}
        options={{
          clientId:
            "Ad-Fzy6p9dkQfjWpUkyfFQlibDgNv6mYEFvxOHBQWgLkzuvRzUDgpbc3Mv4bgCAXRWCj9oSDx-0y0k6M",
          currency: "CAD",
        }}
      />
    </div>
  );
};

export default Cart;
