import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import WelcomeScreen from '../welcome-screen/welcome-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import ActionCreator from '../../reducer';

class App extends PureComponent {
  render() {
    const {questions, step, errorCount, mistakes} = this.props;

    return this._getScreen(step, (userAnswer) => {
      this.props.onUserAnswer(questions[step], userAnswer, errorCount, mistakes);
    });
  }

  _getScreen(step, onClick) {
    const {gameTime, errorCount, questions} = this.props;
    const currentQuestion = questions[step];

    if (step === -1) {
      return <WelcomeScreen
        gameTime={gameTime}
        errorCount={errorCount}
        onStartButtonClick={onClick}
      />;
    }

    switch (currentQuestion.type) {
      case `genre`: return <GenreQuestionScreen
        key={`Genre-question-screen-${step}`}
        question={currentQuestion}
        gameTime={gameTime}
        errorCount={errorCount}
        onAnswer={onClick}
      />;
      case `artist`: return <ArtistQuestionScreen
        key={`Artist-question-screen-${step}`}
        question={currentQuestion}
        gameTime={gameTime}
        errorCount={errorCount}
        onAnswer={onClick}
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
};

const mapSateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: state.step,
  mistakes: state.mistakes,
});

const mapDispatchToProps = (dispatch) => ({
  onUserAnswer: (question, userAnswer, errorCount, mistakes) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(question, userAnswer, errorCount, mistakes));
  }
});

export default connect(mapSateToProps,
    mapDispatchToProps
)(App);
