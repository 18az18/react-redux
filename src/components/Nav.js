import { Button } from "react-bootstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { setIsAuth } from "../actions/userActions";
import avatar from "../assets/dog.png";
import axios from "axios";

const Nav = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000",
  });
  const logOut = () => {
      console.log('logging out');
    instance
      .post("/sessionLogout")
      .then((res) => {
        dispatch(setIsAuth(false));
        console.log(
          "logged out current user successfully, redirecting to home page：",
          res
        );
        history.push("/");
      })
      .catch((err) => {
        console.log("failed logging out, redirect to login page", err);
        history.push("/signin");
      });
  };
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  console.log("isAuth value is: ", isAuth);
  const cartList = useSelector((state) => state.items.cart);
  console.log("cart list is: ", cartList);
  var itemCount = 0;
  cartList.map((item) => (itemCount += item.quantity));
  const [showNavBar, setShowNavBar] = useState(false);
  return (
    <div>
      <h1> Shopping cart </h1>
      <nav>
        <ul>
          <li className="list-group-item">
            <NavLink to="/" activeStyle={{ color: "green" }}>
              Shop
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink to="/checkout" activeStyle={{ color: "green" }}>
              Check Out
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink to="/user" activeStyle={{ color: "green" }}>
              User
            </NavLink>
          </li>
          <li className="list-group-item">
            <NavLink to="/user/address" activeStyle={{ color: "green" }}>
              Address
            </NavLink>
          </li>
          {isAuth ? (
            <Button type="button" onClick={logOut}>
              Log out
            </Button>
          ) : (
            <li className="list-group-item">
              <NavLink to="/signin" activeStyle={{ color: "green" }}>
                Sign in
              </NavLink>
            </li>
          )}

          <li className="list-group-item">
            <img src={avatar} alt="avatar" width="100px" height="70px" />
            <p>{itemCount}</p>
          </li>
          <li className="list-group-item">
            <button
              type="button"
              onClick={() => {
                setShowNavBar(!showNavBar);
                console.log(showNavBar);
              }}
            ></button>
            {showNavBar === true && (
              <div className="dropdown">
                <h1>this is dropdown</h1>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
