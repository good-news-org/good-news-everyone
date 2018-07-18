import * as React from "react";
import {connect} from "react-redux";
import {AppState} from "../types/types";
import {authLogout} from "../auth/authActions";
import {Button} from "@material-ui/core";

type LogoutProps = {
    logout: () => void;
};

const LogoutContainer = ({ logout }: LogoutProps) => (
    <Button onClick={() => logout()}>
        Log out
    </Button>
);

const mapStateToProps = (state: AppState) => ({
});

const mapDispatchToProps = (dispatch: any) => ({
    logout: () => dispatch(authLogout())
});

export const Logout = connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutContainer);