import * as React from "react";
import { AppState } from "../types/types";
import { connect } from "react-redux";
import { routerInit } from "./routerActions";

type Props = {
  children?: JSX.Element;
  init: () => void;
};

export class RouterProvider extends React.Component<Props> {
  componentDidMount() {
    this.props.init();
  }
  render() {
    return this.props.children;
  }
}

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  init: () => dispatch(routerInit())
});

export const Router = connect(
  mapStateToProps,
  mapDispatchToProps
)(RouterProvider);
