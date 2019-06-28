import * as React from 'react';

import QuestionScreenHeader from '../question-screen-header/question-screen-header';
import withActivePlayer from '../../hocs/with-active-player/with-active-player';
import {QuestionArtist, Song, AnswerArtist} from "../../types";

interface Props {
  onAnswer: (answer: AnswerArtist) => void,
  renderPlayer: (song: Song, id: number) => React.ReactElement,
  question: QuestionArtist,
  gameTime: number,
  mistakes: number,
}

class ArtistQuestionScreen extends React.PureComponent<Props, null> {
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

export {ArtistQuestionScreen};

export default withActivePlayer(ArtistQuestionScreen);
