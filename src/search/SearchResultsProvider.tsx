import { TextField } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { User } from "../models/user";
import { AppState } from "../types/types";

type Props = {
  children: (results: Array<User>) => JSX.Element;
};

type StateProps = {
  results: Array<User>;
};

type AllProps = Props & StateProps;

const SearchResultComponent = ({ children, results }: AllProps) => children(results);

const mapStateToProps = (state: AppState): StateProps => ({
  results: state.search.results
});

const mapDispatchToProps = (): {} => ({});

export const SearchResultsProvider = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultComponent);
