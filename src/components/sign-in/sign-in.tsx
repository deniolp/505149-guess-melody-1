import * as React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

import {Operation} from '../../reducer/user/user';
import {getAuthError, getUser} from '../../reducer/user/selectors';
import withFormData from '../../hocs/with-form-data/with-form-data';

interface Props {
  onChangeNameInput: () => void,
  onChangePasswordInput: () => void,
  authError: string,
  history: {push: (path: string) => void},
  user: {},
  formData: {name: string, password: string},
  submitForm: (name: string, password: string) => void;
}

class SignIn extends React.PureComponent<Props, null> {
  constructor(props) {
    super(props);

    this._handleSubmit = this._handleSubmit.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      const {history} = this.props;
      history.push(`/`);
    }
  }

  render() {
    const {authError, onChangeNameInput, onChangePasswordInput} = this.props;

    return <section className="login">
      <div className="login__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/></div>
      <p className="login__text">Представтесь!</p>
      <form className="login__form" action="" onSubmit={this._handleSubmit}>
        <p className="login__field">
          <label className="login__label" htmlFor="name">Логин</label>
          <input className="login__input" type="text" name="name" id="name" onChange={onChangeNameInput} required/>
        </p>
        <p className="login__field">
          <label className="login__label" htmlFor="password">Пароль</label>
          <input className="login__input" type="text" name="password" id="password" onChange={onChangePasswordInput} required/>
          {this._getErrorElement(authError)}
        </p>
        <button className="login__button button" type="submit">Войти</button>
      </form>
    </section>;
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    const {name = ``, password = ``} = this.props.formData;

    this.props.submitForm(name, password);
  }

  _getErrorElement(authError) {
    return authError ? <span className="login__error" style={{
      display: `block`,
    }}>{authError}</span> : ``;
  }
}

const mapStateToProps = (state) => ({
  authError: getAuthError(state),
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  submitForm: (email, password) => dispatch(Operation.authorizeUser(email, password)),
});

export {SignIn};

export default withFormData(connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn)));
