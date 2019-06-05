import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import WelcomeScreen from '../../components/welcome-screen/welcome-screen';
import GenreQuestionScreen from '../../components/genre-question-screen/genre-question-screen';
import ArtistQuestionScreen from '../../components/artist-question-screen/artist-question-screen';
import AuthorizationScreen from '../../components/authorization-screen/authorization-screen';
import SignIn from '../../components/sign-in/sign-in';
import GameOverScreen from '../../components/game-over-screen/game-over-screen';
import WinScreen from '../../components/win-screen/win-screen';
import {ActionCreator} from '../../reducer/game/game';
import {getStep, getMistakes} from '../../reducer/game/selectors';
import {getQuestions} from '../../reducer/data/selectors';
import {getAuthorizationStatus} from '../../reducer/user/selectors';
import withPrivateRoute from '../with-private-routes/with-private-routes';

const withScreenSwitch = (Component) => {
  class WithScreenSwitch extends PureComponent {
    constructor(props) {
      super(props);

      this._getScreen = this._getScreen.bind(this);
    }

    render() {
      const {resetGame, mistakes} = this.props;
      const WinScreenForWrapper = () =>
        <WinScreen
          onReplayButtonClick={resetGame}
          mistakes={mistakes}
        />;

      return <BrowserRouter basename="/505149-guess-melody-1/11/">
        <Switch>
          <Route path="/" exact render={() => <Component
            {...this.props}
            renderScreen={this._getScreen}
          />} />

          <Route path="/win" component={withPrivateRoute(WinScreenForWrapper)} />

          <Route path="/lose" render={() => <GameOverScreen
            onReplayButtonClick={resetGame}
          />} />

          <Route path="/result" render={() => <AuthorizationScreen
            onReplayButtonClick={resetGame}
            mistakes={mistakes}
          />} />

          <Route path="/sign-in" component={SignIn} />
        </Switch>
      </BrowserRouter>;
    }

    _getScreen(question) {
      const {step, questions, onUserAnswer, mistakes, gameTime, errorCount, onWelcomeScreenClick} = this.props;

      if (step > questions.length - 1 && mistakes < errorCount) {
        if (this.props.isAuthorizationRequired) {
          return <Redirect to="/result" />;
        } else {
          return <Redirect to="/win" />;
        }
      }

      if (mistakes >= errorCount) {
        return <Redirect to="/lose" />;
      }

      if (step === -1) {
        return <WelcomeScreen
          gameTime={gameTime}
          errorCount={errorCount}
          onStartButtonClick={onWelcomeScreenClick}
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
