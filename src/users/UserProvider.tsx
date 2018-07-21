import * as React from "react";
import { connect } from "react-redux";
import { User } from "../models/user";
import { AppState } from "../types/types";
import { loadUser } from "./usersActions";
import { CircularProgress } from "@material-ui/core";
import { Loadable, IDLE } from "../types/loadable";
import { or } from "../utils/utils";

type Props = {
  userId: string;
  children: (user: User) => JSX.Element;
};

type StateProps = {
  user: Loadable<User>;
};

type DispatchProps = {
  loadUser: (userId: string) => void;
};

type AllProps = Props & StateProps & DispatchProps;

class Component extends React.Component<AllProps> {
  componentDidMount() {
    if (this.props.user.state === "IDLE") {
      this.props.loadUser(this.props.userId);
    }
  }

  render() {
    switch (this.props.user.state) {
      case "LOADING":
        return <CircularProgress />;
      case "SUCCESS":
        return this.props.children(this.props.user.result);
      case "ERROR":
        return <div>UPS :(</div>;
      case "IDLE":
        return null;
    }
  }
}

const mapStateToProps = (state: AppState, props: Props): StateProps => ({
  user: or(state.users.users[props.userId], IDLE)
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  loadUser: userId => dispatch(loadUser(userId))
});

export const UserProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
