import React, {PureComponent} from 'react';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import PropTypes from 'prop-types';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      question: -1,
    };
  }
  render() {
    const {questions} = this.props;
    const {question} = this.state;

    return this._getScreen(questions[question], () => {
      this.setState({
        question: question < questions.length - 1 ? question + 1 : -1,
      });
    });
  }

  _getScreen(question, onClick) {
    const {gameTime, errorCount} = this.props;
    if (!question) {
      return <WelcomeScreen
        gameTime={gameTime}
        errorCount={errorCount}
        onClick={onClick}
      />;
    }

    switch (question.type) {
      case `genre`: return <GenreQuestionScreen
        question={question}
        gameTime={gameTime}
        errorCount={errorCount}
        onAnswer={onClick}
      />;
      case `artist`: return <ArtistQuestionScreen
        question={question}
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
};

export default App;
