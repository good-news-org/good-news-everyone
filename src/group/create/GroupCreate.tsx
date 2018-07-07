import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../types/types";
import { GroupCreateForm } from "./GroupCreateForm";
import { createGroup } from "../../group/groupActions";

type Props = {
  createGroup: ({ name }: { name: string }) => void;
};

const GroupCreateContainer = ({ createGroup }: Props) => <GroupCreateForm onSubmit={createGroup} />;

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  createGroup: ({ name }: { name: string }) => dispatch(createGroup(name))
});

export const GroupCreate = connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupCreateContainer);
