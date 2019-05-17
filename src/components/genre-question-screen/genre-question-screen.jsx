import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import QuestionScreenHeader from '../question-screen-header/question-screen-header';
import AudioPlayer from '../audio-player/audio-player';

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);
    const {question} = this.props;
    const {answers} = question;

    this.state = {
      selectedAnswers: new Array(answers.length).fill(false),
      activePlayer: -1,
    };
  }

  render() {
    const {question, gameTime, mistakes, onAnswer} = this.props;
    const {answers, genre} = question;

    return <section className="game game--genre">
      <QuestionScreenHeader
        gameTime={gameTime}
        mistakes={mistakes}
      />
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form className="game__tracks" onSubmit={(evt) => {
          evt.preventDefault();
          onAnswer(this.state.selectedAnswers);
        }}>
          {
            answers.map((item, index) => {
              return <div className="track" key={`answer-${index}`}>
                <AudioPlayer
                  src={item.src}
                  isPlaying={index === this.state.activePlayer}
                  onPlayButtonClick={() => this.setState({
                    activePlayer: this.state.activePlayer === index ? -1 : index
                  })}
                />
                <div className="game__answer">
                  <input
                    className="game__input visually-hidden"
                    type="checkbox"
                    name="answer"
                    value={`answer-${index}`}
                    id={`answer-${index}`}
                    onChange={() => {
                      const selectedAnswers = this.state.selectedAnswers.slice(0);
                      selectedAnswers[index] = !selectedAnswers[index];

                      this.setState({
                        selectedAnswers
                      });
                    }}/>
                  <label className="game__check" htmlFor={`answer-${index}`}>Отметить</label>
                </div>
              </div>;
            })
          }
          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    </section>;
  }
}

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
  mistakes: PropTypes.number.isRequired,
};

export default GenreQuestionScreen;
