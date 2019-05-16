import React, {PureComponent} from 'react';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import PropTypes from 'prop-types';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';

class App extends PureComponent {
  static getScreen(question, props, onClick) {
    const {gameTime, errorCount, questions} = props;
    const currentQuestion = questions[question];

    if (question === -1) {
      return <WelcomeScreen
        gameTime={gameTime}
        errorCount={errorCount}
        onStartButtonClick={onClick}
      />;
    }

    switch (currentQuestion.type) {
      case `genre`: return <GenreQuestionScreen
        question={currentQuestion}
        gameTime={gameTime}
        errorCount={errorCount}
        onAnswer={onClick}
      />;
      case `artist`: return <ArtistQuestionScreen
        question={currentQuestion}
        gameTime={gameTime}
        errorCount={errorCount}
        onAnswer={onClick}
      />;
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      question: -1,
    };
  }
  render() {
    const {questions} = this.props;
    const {question} = this.state;

    return App.getScreen(question, this.props, () => {
      this.setState({
        question: question < questions.length - 1 ? question + 1 : -1,
      });
    });
  }
}

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  questions: PropTypes.array.isRequired,
};

export default App;
