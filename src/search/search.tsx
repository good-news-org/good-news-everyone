import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../types/types";
import { routerPush } from "./searchActions";
import { TextField } from "@material-ui/core";

type Props = {
  children?: JSX.Element;
  to: string;
};

type DispatchProps = {
  navigate: (href: string) => void;
};

type AllProps = Props & DispatchProps;

const SearchComponent = ({ to, navigate, children }: AllProps) => (
  <TextField onChange={} type="text" />
);

const mapStateToProps = (state: AppState): {} => ({});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  search: e => dispatch(searchUser(e.value))
});

export const Search = connect<{}, DispatchProps, Props>(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent);
