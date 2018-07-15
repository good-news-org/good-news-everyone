import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import * as React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { AuthProvider } from "../auth/AuthProvider";
import { Group } from "../group/Group";
import { Groups } from "../groups/Groups";
import { Login } from "../login/Login";
import { Router } from "../router/Router";
import { AppAction, AppState } from "../types/types";
import "./App.css";
import { appEpics } from "./appEpics";
import { appReducer } from "./appReducer";
import { Route } from "../router/Route";

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
      <Route path="/group/:id">
        {({ params, route, uri }) => (
          <div className="flex grow">
            <Group id={params.id} />
          </div>
        )}
      </Route>
    </div>
  </div>
);

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Router>
          <AuthProvider>{(user: any) => (user ? <Content /> : <Login />)}</AuthProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
