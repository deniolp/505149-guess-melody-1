import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import QuestionScreenHeader from '../question-screen-header/question-screen-header';
import withActivePlayer from '../../hocs/with-active-player/with-active-player';
import withSelectedAnswers from '../../hocs/with-selected-answers/with-selected-answers';
import withTransformedProps from '../../hocs/with-transformed-props/with-transformed-props';

class GenreQuestionScreen extends PureComponent {
  render() {
    const {question, gameTime, mistakes, onAnswer, renderAnswer, selectedAnswers, onChange} = this.props;
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
          onAnswer();
        }}>
          {
            answers.map((item, index) => {
              return <div className="track" key={`answer-${index}`}>
                {renderAnswer(item, index)}
                <div className="game__answer">
                  <input
                    className="game__input visually-hidden"
                    type="checkbox"
                    name="answer"
                    checked={selectedAnswers[index]}
                    value={`answer-${index}`}
                    id={`answer-${index}`}
                    onChange={() => onChange(index)}/>
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
  onChange: PropTypes.func.isRequired,
  renderAnswer: PropTypes.func.isRequired,
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
  selectedAnswers: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

export {GenreQuestionScreen};

export default withSelectedAnswers(withActivePlayer(
    withTransformedProps((props) => {
      const newProps = Object.assign({}, props, {
        renderAnswer: props.renderPlayer,
      });
      delete newProps.renderPlayer;
      return newProps;
    })(GenreQuestionScreen)));
