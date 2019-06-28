import * as React from 'react';
import {Subtract} from 'utility-types';

interface State {
  formData: {}
}

interface InjectedProps {
  formData: string[],
  onChangeNameInput: (evt: {target: {value: string}}) => void,
  onChangePasswordInput: (evt: {target: {value: string}}) => void,
}

const withFormData = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectedProps>;
  class WithFormData extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        formData: {},
      };

      this._handleNameInput = this._handleNameInput.bind(this);
      this._handlePasswordInput = this._handlePasswordInput.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        formData={this.state.formData}
        onChangeNameInput={this._handleNameInput}
        onChangePasswordInput={this._handlePasswordInput}
      />;
    }

    _handleNameInput(evt) {
      this.setState({
        formData: Object.assign({}, this.state.formData, {name: evt.target.value}),
      });
    }

    _handlePasswordInput(evt) {
      this.setState({
        formData: Object.assign({}, this.state.formData, {password: evt.target.value}),
      });
    }
  }

  return WithFormData;
};

export default withFormData;
