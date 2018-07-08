import * as React from "react";

type Props = {
  children: (a: any) => JSX.Element;
};

type State = {
  isOpen: boolean;
};

export class DialogProvider extends React.Component<Props, State> {
  state = { isOpen: false };

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    return this.props.children({
      open: this.handleOpen,
      close: this.handleClose,
      isOpen: this.state.isOpen
    });
  }
}
