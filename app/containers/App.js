// @flow
import * as React from 'react';
import {ToastContainer} from 'react-toastify';
type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;
    return <React.Fragment>{children}</React.Fragment>
  }
}
