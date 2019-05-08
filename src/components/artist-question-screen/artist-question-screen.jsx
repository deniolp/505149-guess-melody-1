import React from 'react';
import PropTypes from 'prop-types';
import QuestionScreenHeader from '../question-screen-header/question-screen-header';

const ArtistQuestionScreen = ({gameTime, errorCount, question, onAnswer}) => {
  const {answers, song} = question;

  return <section className="game game--artist">
    <QuestionScreenHeader
      gameTime={gameTime}
      errorCount={errorCount}
    />
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <button className="track__button track__button--play" type="button"></button>
        <audio src={song.src}></audio>
      </div>

      <form className="game__artist" onChange={onAnswer}>
        {
          answers.map((item, index) => <div className="artist" key={index}>
            <input className="artist__input visually-hidden" type="radio" name="answer" value={`artist-${index}`} id={`artist-${index}`}/>
            <label className="artist__name" htmlFor={`artist-${index}`}>
              <img className="artist__picture" src={item.picture} alt={item.artist}/>
              {item.artist}
            </label>
          </div>)
        }
      </form>
    </section>
  </section>;
};

ArtistQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      picture: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
    })),
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  type: PropTypes.oneOf([`genre`, `artist`]),
  gameTime: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
};


export default ArtistQuestionScreen;
