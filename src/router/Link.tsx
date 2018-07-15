import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../types/types";
import { routerPush } from "./routerActions";

type Props = {
  children?: JSX.Element;
  to: string;
};

type DispatchProps = {
  navigate: (href: string) => void;
};

type AllProps = Props & DispatchProps;

const LinkComponent = ({ to, navigate, children }: AllProps) => (
  <a href={to} onClick={event => event.preventDefault() || navigate(to)}>
    {children}
  </a>
);

const mapStateToProps = (state: AppState): {} => ({});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  navigate: href => dispatch(routerPush(href))
});

export const Link = connect<{}, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(LinkComponent);
