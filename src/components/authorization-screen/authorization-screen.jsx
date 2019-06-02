import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Operation} from '../../reducer/user/user';

class AuthorizationScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: ``,
      password: ``,
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleNameInput = this._handleNameInput.bind(this);
    this._handlePasswordInput = this._handlePasswordInput.bind(this);
  }

  render() {
    const {onReplayButtonClick} = this.props;
    return <section className="login">
      <div className="login__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/></div>
      <h2 className="login__title">Вы настоящий меломан!</h2>
      <p className="login__total">За 3 минуты и 25 секунд вы набрали 12 баллов (8 быстрых), совершив 3 ошибки</p>
      <p className="login__text">Хотите сравнить свой результат с предыдущими попытками? Представтесь!</p>
      <form className="login__form" action="" onSubmit={this._handleSubmit}>
        <p className="login__field">
          <label className="login__label" htmlFor="name">Логин</label>
          <input className="login__input" type="text" name="name" id="name" onChange={this._handleNameInput} required/>
        </p>
        <p className="login__field">
          <label className="login__label" htmlFor="password">Пароль</label>
          <input className="login__input" type="text" name="password" id="password" onChange={this._handlePasswordInput} required/>
          <span className="login__error">Неверный пароль</span>
        </p>
        <button className="login__button button" type="submit">Войти</button>
      </form>
      <button className="replay" type="button" onClick={onReplayButtonClick}>Сыграть ещё раз</button>
    </section>;
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    const name = this.state.name;
    const password = this.state.password;

    this.props.submitForm(name, password);
  }

  _handleNameInput(evt) {
    this.setState({
      name: evt.target.value,
    });
  }

  _handlePasswordInput(evt) {
    this.setState({
      password: evt.target.value,
    });
  }
}

AuthorizationScreen.propTypes = {
  submitForm: PropTypes.func.isRequired,
  onReplayButtonClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitForm: (email, password) => dispatch(Operation.authorizeUser(email, password)),
});

export {AuthorizationScreen};

export default connect(null, mapDispatchToProps)(AuthorizationScreen);
