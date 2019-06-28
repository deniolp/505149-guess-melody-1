import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import QuestionScreenHeader from '../question-screen-header/question-screen-header';
import withActivePlayer from '../../hocs/with-active-player/with-active-player';

class ArtistQuestionScreen extends PureComponent {
  render() {
    const {gameTime, mistakes, question, onAnswer, renderPlayer} = this.props;
    const {answers, song} = question;

    return <section className="game game--artist">
      <QuestionScreenHeader
        gameTime={gameTime}
        mistakes={mistakes}
      />
      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          {renderPlayer(song, 0)}
        </div>

        <form className="game__artist">
          {
            answers.map((item, index) => <div className="artist" key={index}>
              <input
                className="artist__input visually-hidden"
                type="radio"
                name="answer"
                value={`artist-${index}`}
                id={`artist-${index}`}
                onClick={() => onAnswer(item)}
              />
              <label className="artist__name" htmlFor={`artist-${index}`}>
                <img className="artist__picture" src={item.picture} alt={item.artist}/>
                {item.artist}
              </label>
            </div>)
          }
        </form>
      </section>
    </section>;
  }
}

ArtistQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
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
  mistakes: PropTypes.number.isRequired,
};

export {ArtistQuestionScreen};

export default withActivePlayer(ArtistQuestionScreen);
