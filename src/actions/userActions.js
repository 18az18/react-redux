import * as actions from "./types";
import axios from "axios";
const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000",
});

export const setUser = (userCred) => {
  console.log("setting user to " + userCred + " in action creator");
  return {
    type: actions.SET_USER,
    payload: userCred,
  };
};

export const setCSRFToken = (token) => {
  console.log("setting token to: ", token);
  return {
    type: actions.SET_CSRFTOKEN,
    payload: token,
  };
};

export const fetchCSRFToken = (idToken, trySessionLogin) => {
  return (dispatch) => {
    instance
      .get("csrfToken", {
        withCredentials: "include",
      })
      .then((res) => {
        console.log("getting csrftoken: ", res.data);
        dispatch(setCSRFToken(res.data));
        trySessionLogin(idToken, res.data);
      })
      .catch((err) => {
        console.log("err in getting csurf token: ", err);
      });
  };
};

export const setIsAuth = (isAuth) => {
  return {
    type: actions.SET_ISAUTH,
    payload: isAuth,
  };
};
