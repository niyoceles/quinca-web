import React, { Component } from "react";
import { Provider } from "react-redux";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import store from "./redux/store/index";
import { SET_AUTHENTICATED } from "../src/redux/types";
import { logoutUser } from "../src/redux/actions";
import { Routes } from "./Routes";
import SocketHandler from "./components/common/SocketHandler";

const token = localStorage.IdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SocketHandler />
        <Routes />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={false}
        />
      </Provider>
    );
  }
}

export default App;
