import { useEffect } from "react";
import firebase from "firebase/app";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setUser, fetchCSRFToken, setIsAuth } from "../actions/userActions";
import "firebase/auth";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";

const Signin = () => {
  // const [redirectTo, setRedirectTo] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation();
  const user = useSelector((state) => state.user.user);
  console.log("user cred is: ", user);
  const csrfToken = useSelector((state) => state.user.csrfToken);
  console.log("new csrftoken is: ", csrfToken);
  const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000",
  });

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((userCred) => {
      if (userCred) {
        console.log("on auth change user cred is: ", userCred);
        dispatch(setUser(userCred));
        userCred.getIdToken().then((idToken) => {
          console.log("user token is: ", idToken);
        });
      } else {
        // user logged out
      }
      return unsubscribe;
    });
  }, [dispatch, csrfToken]);

  const SignInWithGoogle = () => {
    console.log("signing in with google");
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userCred) => {
        console.log("signed in with google", userCred.user);
        userCred.user.getIdToken().then((idToken) => {
          console.log("user token in sign in is: ", idToken);
          dispatch(fetchCSRFToken(idToken, trySessionLogin));

          //trySessionLogin(idToken, csrfToken);
        });

        //dispatch(sessionLogin(token, csrfToken));
      })
      .catch((err) => {});
  };

  const trySessionLogin = (idToken, csrfToken) => {
    console.log("trying session login");
    instance
      .post(
        "sessionLogin",
        {
          idToken,
          csrfToken,
        },
        {
          headers: {
            "CSRF-Token": csrfToken,
          },
        }
      )
      .then((res) => {
        dispatch(setIsAuth(true));
        console.log("success update session frontend: ", res);
        console.log('location is: ', location);
        let { from } = location.state || { from: { pathname: "/" } };
        console.log("going to: ", from);
        history.replace(from);
      })
      .catch((err) => {
        console.log("failed update session login frontend: ", err);
      });
  };

  const tryAuth = () => {
    user.getIdToken().then((idToken) => {
      console.log("try auth user token is: ", idToken);
      instance
        .get("user/changeAddress", {
          headers: {
            "CSRF-Token": csrfToken,
            Authorization: "Bearer " + idToken,
          },
        })
        .then((res) => {
          console.log("success tryauth frontend: ", res);
        })
        .catch((err) => {
          console.log("failed tryauth frontend: ", err);
        });
    });
  };

  return (
    <div className="justify-content-start align-self-start">
      <Button className="w-100" type="button" onClick={SignInWithGoogle}>
        SignInWithGoogle
      </Button>
      <Button className="w-100" type="button" onClick={tryAuth}>
        SignInWithGoogle
      </Button>
    </div>
  );
};

export default Signin;
