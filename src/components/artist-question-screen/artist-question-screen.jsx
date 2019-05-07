import React from 'react';
import PropTypes from 'prop-types';

const ArtistQuestionScreen = (props) => {
  const {answers, song} = props;

  return <section className="game__screen">
    <h2 className="game__title">Кто исполняет эту песню?</h2>
    <div className="game__track">
      <button className="track__button track__button--play" type="button"></button>
      <audio src={song.src}></audio>
    </div>

    <form className="game__artist">
      {
        answers.map((item, index) => <div className="artist" key={index}>
          <input className="artist__input visually-hidden" type="radio" name="answer" value={`artist-${index}`} id={`artist-${index}`}/>
          <label className="artist__name" htmlFor={`artist-${index}`}>
            <img className="artist__picture" src={item.picture} alt={item.artist}/>
          Пелагея
          </label>
        </div>)
      }
    </form>
  </section>;
};

ArtistQuestionScreen.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.shape({
    picture: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
  })),
  song: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  })
};

export default ArtistQuestionScreen;
