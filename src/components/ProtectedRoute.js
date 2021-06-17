import { Route, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, ...rest }) => {
    let isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated === true ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
    }
export default ProtectedRoute;
