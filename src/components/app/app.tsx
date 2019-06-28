import * as React from 'react';
import {connect} from 'react-redux';

import withScreenSwitch from '../../hocs/with-screen-switch/with-screen-switch';
import {getStep} from '../../reducer/game/selectors';
import {getQuestions} from '../../reducer/data/selectors';
import {QuestionArtist, QuestionGenre} from "../../types";

type Question = QuestionArtist | QuestionGenre;
interface Props {
  renderScreen: (question: Question) => React.ReactElement,
  questions: Question[],
  step: number,
}

class App extends React.PureComponent<Props, null> {
  render() {
    const {questions, step, renderScreen} = this.props;

    return renderScreen(questions[step]);
  }
}

const mapStateToProps = (state) => ({
  step: getStep(state),
  questions: getQuestions(state),
});

export {App};

export default withScreenSwitch(connect(mapStateToProps)(App));
