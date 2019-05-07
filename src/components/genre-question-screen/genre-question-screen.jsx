import React from 'react';
import PropTypes from 'prop-types';

const GenreQuestionScreen = ({question, onAnswer}) => {
  const {answers, genre} = question;

  return <section className="game game--genre">
    <header className="game__header">
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
        <span className="timer__mins">05</span>
        <span className="timer__dots">:</span>
        <span className="timer__secs">00</span>
      </div>

      <div className="game__mistakes">
        <div className="wrong"></div>
        <div className="wrong"></div>
        <div className="wrong"></div>
      </div>
    </header>
    <section className="game__screen">
      <h2 className="game__title">Выберите {genre} треки</h2>
      <form className="game__tracks" onSubmit={(evt) => {
        evt.preventDefault();
        onAnswer();
      }}>
        {
          answers.map((item, index) => <div className="track" key={`answer-${index}`}>
            <button className="track__button track__button--play" type="button"></button>
            <div className="track__status">
              <audio src={item.src}></audio>
            </div>
            <div className="game__answer">
              <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${index}`} id={`answer-${index}`}/>
              <label className="game__check" htmlFor={`answer-${index}`}>Отметить</label>
            </div>
          </div>)
        }
        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
  </section>;
};

GenreQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.oneOf([`blues`, `rock`, `jazz`]).isRequired,
    })).isRequired,
    genre: PropTypes.oneOf([`blues`, `rock`, `jazz`]).isRequired,
    type: PropTypes.oneOf([`genre`, `artist`]).isRequired,
  }).isRequired,
};

export default GenreQuestionScreen;
