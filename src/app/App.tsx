import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { Router } from "@reach/router";
import * as React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { AuthProvider } from "../auth/AuthProvider";
import { Group } from "../group/Group";
import { Groups } from "../groups/Groups";
import { Login } from "../login/Login";
import { AppAction, AppState } from "../types/types";
import "./App.css";
import { appEpics } from "./appEpics";
import { appReducer } from "./appReducer";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware<AppAction, AppAction, AppState>();
const store = createStore(appReducer, composeEnhancers(applyMiddleware(epicMiddleware)));
epicMiddleware.run(appEpics);

const Content = () => (
  <div className="flex vertical grow">
    <AppBar position="static" color="default">
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit">
          Good News, Everyone!
        </Typography>
      </Toolbar>
    </AppBar>
    <div className="flex grow">
      <div>
        <Groups />
      </div>
      <Router className="flex grow">
        <Group path="/group/:id" />
      </Router>
    </div>
  </div>
);

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <AuthProvider>{(user: any) => (user ? <Content /> : <Login />)}</AuthProvider>
      </Provider>
    );
  }
}

export default App;
