import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../types/types";
import { match } from "./lib/utils";

type Props = {
  children: (a: { params: any; route: any; uri: string }) => React.ReactNode;
  path: string;
};

type StateProps = {
  location: string;
  params: object;
};

type AllProps = Props & StateProps;

const RouteComponent = ({ path, location, children }: AllProps): any => {
  const m = match(path, location);
  console.log(m);
  return m && children ? children(m) : null;
};

const mapStateToProps = (state: AppState, props: Props): StateProps => ({
  location: state.router.location,
  params: state.router.params[props.path]
});

const mapDispatchToProps = (): object => ({});

export const Route = connect<StateProps, {}, Props>(
  mapStateToProps,
  mapDispatchToProps
)(RouteComponent);
