import React from 'react';
import PropTypes from 'prop-types';

const GenreQuestionScreen = (props) => {
  const {answers, genre} = props;

  return <section className="game__screen">
    <h2 className="game__title">Выберите {genre} треки</h2>
    <form className="game__tracks">
      {
        answers.map((item, index) => <div className="track" key={`answer-${index}`}>
          <button className="track__button track__button--play" type="button"></button>
          <div className="track__status">
            <audio></audio>
          </div>
          <div className="game__answer">
            <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${index}`} id={`answer-${index}`}/>
            <label className="game__check" htmlFor={`answer-${index}`}>Отметить</label>
          </div>
        </div>)
      }
      <button className="game__submit button" type="submit">Ответить</button>
    </form>
  </section>;
};

GenreQuestionScreen.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    genre: PropTypes.oneOf([`blues`, `rock`, `jazz`]).isRequired,
  })),
  genre: PropTypes.oneOf([`blues`, `rock`, `jazz`]).isRequired,
};

export default GenreQuestionScreen;
