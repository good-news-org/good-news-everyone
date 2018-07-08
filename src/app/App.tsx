import * as React from "react";
import "./App.css";
import { AuthProvider } from "../auth/AuthProvider";
import { Provider } from "react-redux";
import { createEpicMiddleware } from "redux-observable";
import { createStore, applyMiddleware, compose } from "redux";
import { appReducer } from "./appReducer";
import { appEpics } from "./appEpics";
import { Groups } from "../groups/Groups";
import { Login } from "../login/Login";
import { AppAction, AppState } from "../types/types";
import { Router } from "@reach/router";
import { Group } from "../group/Group";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware<AppAction, AppAction, AppState>();
const store = createStore(appReducer, composeEnhancers(applyMiddleware(epicMiddleware)));
epicMiddleware.run(appEpics);

const Content = () => (
  <div className="flex">
    <div>
      <Groups />
    </div>
    <div className="grow">
      <Router>
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
