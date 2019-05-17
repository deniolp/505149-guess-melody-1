import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class QuestionScreenHeader extends PureComponent {
  render() {
    const {gameTime, mistakes} = this.props;

    return <header className="game__header">
      <a className="game__back" href="#">
        <span className="visually-hidden">Сыграть ещё раз</span>
        <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
      </a>

      <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
        <circle className="timer__line" cx="390" cy="390" r="370"
          style={{
            filter: `url("#blur")`,
            transform: `rotate(-90deg) scaleY(-1)`,
            transformOrigin: `center`,
          }}/>
      </svg>

      <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
        <span className="timer__mins">0{gameTime}</span>
        <span className="timer__dots">:</span>
        <span className="timer__secs">00</span>
      </div>

      <div className="game__mistakes">
        {this._showAmountOfMistakes(mistakes)}
      </div>
    </header>;
  }

  _showAmountOfMistakes(count) {
    const mistakesElements = [];
    for (let i = 0; i < count; i++) {
      mistakesElements.push(<div className="wrong" key={i}></div>);
    }
    return mistakesElements;
  }
}

QuestionScreenHeader.propTypes = {
  gameTime: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
};

export default QuestionScreenHeader;
