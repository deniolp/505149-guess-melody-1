import React from 'react';
import PropTypes from 'prop-types';
import QuestionScreenHeader from '../question-screen-header/question-screen-header';

const GenreQuestionScreen = ({gameTime, errorCount, question, onAnswer}) => {
  const {answers, genre} = question;

  return <section className="game game--genre">
    <QuestionScreenHeader
      gameTime={gameTime}
      errorCount={errorCount}
    />
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
  gameTime: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
};

export default GenreQuestionScreen;
