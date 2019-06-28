import React, {PureComponent} from 'react';

const withFormData = (Component) => {
  class WithFormData extends PureComponent {
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
