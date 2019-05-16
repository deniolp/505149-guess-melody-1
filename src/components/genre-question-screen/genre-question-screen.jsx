import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import QuestionScreenHeader from '../question-screen-header/question-screen-header';
import AudioPlayer from '../audio-player/audio-player';

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedAnswers: {},
      activePlayer: -1,
    };

    this._onSubmitHandle = this._onSubmitHandle.bind(this);
    this._onChangeCheckboxHandle = this._onChangeCheckboxHandle.bind(this);
  }

  render() {
    const {question, gameTime, errorCount} = this.props;
    const {answers, genre} = question;

    return <section className="game game--genre">
      <QuestionScreenHeader
        gameTime={gameTime}
        errorCount={errorCount}
      />
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form className="game__tracks" onSubmit={this._onSubmitHandle}>
          {
            answers.map((item, index) => {
              const isChecked = this.state.selectedAnswers[`answer-${index}`] ? true : false;

              return <div className="track" key={`answer-${index}`}>
                <AudioPlayer
                  src={item.src}
                  isPlaying={index === this.state.activePlayer}
                  onPlayButtonClick={() => this.setState({
                    activePlayer: this.state.activePlayer === index ? -1 : index
                  })}
                />
                <div className="game__answer">
                  <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${index}`} id={`answer-${index}`} checked={isChecked} onChange={this._onChangeCheckboxHandle}/>
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

  _onSubmitHandle(evt) {
    evt.preventDefault();

    const answers = Object.keys(this.state.selectedAnswers).filter((key) => this.state.selectedAnswers[key]);

    this.props.onAnswer(answers);
  }

  _onChangeCheckboxHandle(evt) {
    const tempObj = {
      [evt.target.value]: evt.target.checked,
    };

    this.setState({
      selectedAnswers: Object.assign({}, this.state.selectedAnswers, tempObj),
    });
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
  errorCount: PropTypes.number.isRequired,
};

export default GenreQuestionScreen;
