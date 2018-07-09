import * as React from "react";
import { connect } from "react-redux";
import { User } from "../models/user";
import { AppState } from "../types/types";
import { loadUser } from "./usersActions";
import { CircularProgress } from "@material-ui/core";

type Props = {
  userId: string;
  children: ({ user }: { user: User }) => JSX.Element;
};

type StateProps = {
  user?: User;
};

type DispatchProps = {
  loadUser: (userId: string) => void;
};

type AllProps = Props & StateProps & DispatchProps;

class Component extends React.Component<AllProps> {
  componentDidMount() {
    if (!this.props.user) {
      this.props.loadUser(this.props.userId);
    }
  }

  render() {
    if (this.props.user) {
      return this.props.children({
        user: this.props.user
      });
    } else {
      return <CircularProgress />;
    }
  }
}

const mapStateToProps = (state: AppState, props: Props): StateProps => ({
  user: state.users.users[props.userId]
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  loadUser: userId => dispatch(loadUser(userId))
});

export const UserProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
