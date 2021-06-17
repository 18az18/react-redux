import { Route, Switch } from "react-router-dom";
import Address from "./Address";
import Checkout from "./Checkout";
import OrderHistory from "./OrderHistory";
import PageNotFound from "./PageNotFound";
import Payment from "./Payment";
import PersonalPage from "./PersonalPage";
import ProtectedRoute from "./ProtectedRoute";
import Shop from "./Shop";
import Signin from "./Signin";
import Signup from "./Signup";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Shop />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/checkout">
        <Checkout />
      </Route>
      <Route path="/user" exact>
        <PersonalPage />
      </Route>
      <Route path="/user/payment">
        <Payment />
      </Route>
      <Route path="/user/orderhistory">
        <OrderHistory />
      </Route>
      <ProtectedRoute path="/user/address">
        <Address />
      </ProtectedRoute>
      <Route>
        <PageNotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
