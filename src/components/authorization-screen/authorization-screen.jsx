import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Operation} from '../../reducer/user/user';
import {getAuthError} from '../../reducer/user/selectors';
import withFormData from '../../hocs/with-form-data/with-form-data';

class AuthorizationScreen extends PureComponent {
  constructor(props) {
    super(props);

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  render() {
    const {onReplayButtonClick, mistakes, authError, onChangeNameInput, onChangePasswordInput} = this.props;

    return <section className="login">
      <div className="login__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/></div>
      <h2 className="login__title">Вы настоящий меломан!</h2>
      <p className="login__total">Вы выиграли, совершив {mistakes} ошибки(-у, -ок)</p>
      <p className="login__text">Хотите сравнить свой результат с предыдущими попытками? Представтесь!</p>
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
      <button className="replay" type="button" onClick={onReplayButtonClick}>Сыграть ещё раз</button>
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

AuthorizationScreen.propTypes = {
  submitForm: PropTypes.func.isRequired,
  onChangePasswordInput: PropTypes.func,
  onChangeNameInput: PropTypes.func,
  onReplayButtonClick: PropTypes.func.isRequired,
  mistakes: PropTypes.number.isRequired,
  authError: PropTypes.string,
  formData: PropTypes.objectOf(PropTypes.string),
};

const mapStateToProps = (state) => ({
  authError: getAuthError(state),
});

const mapDispatchToProps = (dispatch) => ({
  submitForm: (email, password) => dispatch(Operation.authorizeUser(email, password)),
});

export {AuthorizationScreen};

export default withFormData(connect(mapStateToProps, mapDispatchToProps)(AuthorizationScreen));
