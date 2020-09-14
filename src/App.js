import React, { Component } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import objectTheme from "./utils/theme";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./redux/store/index";
import { SET_AUTHENTICATED } from "../src/redux/types";
import { logoutUser } from "../src/redux/actions";
import { Routes } from "./Routes";

const theme = createMuiTheme(objectTheme);

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
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Routes />
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
