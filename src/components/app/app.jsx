import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import WelcomeScreen from '../welcome-screen/welcome-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GameOverScreen from '../game-over-screen/game-over-screen';
import WinScreen from '../win-screen/win-screen';
import {ActionCreator} from '../../reducer';

class App extends PureComponent {
  render() {
    const {questions, step} = this.props;

    return this._getScreen(questions[step]);
  }

  _getScreen(question) {
    if (!question) {
      const {step, questions, resetGame} = this.props;

      if (step > questions.length - 1) {
        return <WinScreen
          onReplayButtonClick={resetGame}
        />;
      } else {
        const {errorCount, gameTime, onWelcomeScreenClick} = this.props;

        return <WelcomeScreen
          gameTime={gameTime}
          errorCount={errorCount}
          onStartButtonClick={onWelcomeScreenClick}
        />;
      }
    }

    const {onUserAnswer, mistakes, errorCount, step, gameTime, resetGame} = this.props;

    if (mistakes >= errorCount) {
      return <GameOverScreen
        onReplayButtonClick={resetGame}
      />;
    }

    switch (question.type) {
      case `genre`: return <GenreQuestionScreen
        key={`Genre-question-screen-${step}`}
        question={question}
        gameTime={gameTime}
        mistakes={mistakes}
        onAnswer={(userAnswer) => onUserAnswer(question, userAnswer)}
      />;

      case `artist`: return <ArtistQuestionScreen
        key={`Artist-question-screen-${step}`}
        question={question}
        gameTime={gameTime}
        mistakes={mistakes}
        onAnswer={(userAnswer) => onUserAnswer(question, userAnswer)}
      />;
    }

    return null;
  }
}

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  questions: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeScreenClick: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
};

const mapSateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: state.step,
  mistakes: state.mistakes,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: () => dispatch(ActionCreator.incrementStep()),

  onUserAnswer: (question, userAnswer) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(question, userAnswer));
  },
  resetGame: () => dispatch(ActionCreator.resetGame()),
});

export {App};

export default connect(mapSateToProps,
    mapDispatchToProps
)(App);
