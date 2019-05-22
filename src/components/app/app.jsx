import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import WelcomeScreen from '../welcome-screen/welcome-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import {ActionCreator} from '../../reducer';
import withActivePlayer from '../../hocs/with-active-player/with-active-player';
import withSelectedAnswers from '../../hocs/with-selected-answers/with-selected-answers';
import withTransformedProps from '../../hocs/with-transformed-props/with-transformed-props';

const GenreQuestionScreenWrapped = withSelectedAnswers(withActivePlayer(
    withTransformedProps((props) => {
      const newProps = Object.assign({}, props, {
        renderAnswer: props.renderPlayer,
      });
      delete newProps.renderPlayer;
      return newProps;
    })(GenreQuestionScreen)));
const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);

class App extends PureComponent {
  render() {
    const {questions, step} = this.props;

    return this._getScreen(questions[step]);
  }

  _getScreen(question) {
    if (!question) {
      const {errorCount, gameTime, onWelcomeScreenClick} = this.props;
      return <WelcomeScreen
        gameTime={gameTime}
        errorCount={errorCount}
        onStartButtonClick={onWelcomeScreenClick}
      />;
    }

    const {onUserAnswer, mistakes, errorCount, step, gameTime, questions} = this.props;
    const length = questions.length;

    switch (question.type) {
      case `genre`: return <GenreQuestionScreenWrapped
        key={`Genre-question-screen-${step}`}
        question={question}
        gameTime={gameTime}
        mistakes={mistakes}
        onAnswer={(userAnswer) => onUserAnswer(question, step, userAnswer, errorCount, mistakes, length)}
      />;

      case `artist`: return <ArtistQuestionScreenWrapped
        key={`Artist-question-screen-${step}`}
        question={question}
        gameTime={gameTime}
        mistakes={mistakes}
        onAnswer={(userAnswer) => onUserAnswer(question, step, userAnswer, errorCount, mistakes, length)}
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
};

const mapSateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: state.step,
  mistakes: state.mistakes,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: () => dispatch(ActionCreator.incrementStep()),

  onUserAnswer: (question, step, userAnswer, errorCount, mistakes, length) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(question, length, userAnswer, errorCount, mistakes, step));
  }
});

export {App};

export default connect(mapSateToProps,
    mapDispatchToProps
)(App);
