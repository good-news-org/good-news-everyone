import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../types/types";
import { TextField } from "@material-ui/core";
import { searchUser } from "./searchActions";

type DispatchProps = {
  search: (href: string) => void;
};

type AllProps = DispatchProps;

const SearchComponent = ({ search }: AllProps) => <TextField onChange={e => search(e.target.value)} type="text" />;

const mapStateToProps = (state: AppState): {} => ({});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  search: query => dispatch(searchUser(query))
});

export const Search = connect<{}, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent);
