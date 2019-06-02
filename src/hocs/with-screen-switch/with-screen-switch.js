import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import WelcomeScreen from '../../components/welcome-screen/welcome-screen';
import GenreQuestionScreen from '../../components/genre-question-screen/genre-question-screen';
import ArtistQuestionScreen from '../../components/artist-question-screen/artist-question-screen';
import AuthorizationScreen from '../../components/authorization-screen/authorization-screen';
import GameOverScreen from '../../components/game-over-screen/game-over-screen';
import WinScreen from '../../components/win-screen/win-screen';
import {ActionCreator} from '../../reducer/game/game';
import {getStep, getMistakes} from '../../reducer/game/selectors';
import {getQuestions} from '../../reducer/data/selectors';
import {getAuthorizationStatus} from '../../reducer/user/selectors';

const withScreenSwitch = (Component) => {
  class WithScreenSwitch extends PureComponent {
    constructor(props) {
      super(props);

      this._getScreen = this._getScreen.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        renderScreen={this._getScreen}
      />;
    }

    _getScreen(question) {
      if (!question) {
        const {step, questions, resetGame, mistakes, errorCount} = this.props;

        if (step > questions.length - 1 && mistakes < errorCount) {
          if (this.props.isAuthorizationRequired) {
            return <AuthorizationScreen
              onReplayButtonClick={resetGame}
              mistakes={mistakes}
            />;
          } else {
            return <WinScreen
              onReplayButtonClick={resetGame}
              mistakes={mistakes}
            />;
          }
        } else if (mistakes >= errorCount) {
          return <GameOverScreen
            onReplayButtonClick={resetGame}
          />;
        } else {
          const {gameTime, onWelcomeScreenClick} = this.props;

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

  WithScreenSwitch.propTypes = {
    gameTime: PropTypes.number.isRequired,
    isAuthorizationRequired: PropTypes.bool.isRequired,
    errorCount: PropTypes.number.isRequired,
    onClick: PropTypes.func,
    questions: PropTypes.array.isRequired,
    step: PropTypes.number.isRequired,
    mistakes: PropTypes.number.isRequired,
    onUserAnswer: PropTypes.func.isRequired,
    onWelcomeScreenClick: PropTypes.func.isRequired,
    resetGame: PropTypes.func.isRequired,
  };

  return WithScreenSwitch;
};

export {withScreenSwitch};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: getStep(state),
  questions: getQuestions(state),
  mistakes: getMistakes(state),
  isAuthorizationRequired: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: () => dispatch(ActionCreator.incrementStep()),

  onUserAnswer: (question, userAnswer) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(question, userAnswer));
  },
  resetGame: () => dispatch(ActionCreator.resetGame()),
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withScreenSwitch);
