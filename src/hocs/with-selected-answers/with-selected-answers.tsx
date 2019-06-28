import * as React from 'react';
import {Subtract} from 'utility-types';

interface Props {
  answers: {
    src: string,
    genre: string,
  }[],
  onAnswer: (answers: boolean[]) => void,
}
interface InjectedProps {
  selectedAnswers: boolean[],
  onChange: (i: number) => void,
  onAnswer: () => void,
}

interface State {
  selectedAnswers: boolean[],
}

const withSelectedAnswers = (Component) => {
  type P = Props & React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectedProps>;
  class WithSelectedAnswers extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);
      this.state = {
        selectedAnswers: new Array(props.question.answers.length).fill(false),
      };

      this._onAnswer = this._onAnswer.bind(this);
      this._onChange = this._onChange.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        selectedAnswers={this.state.selectedAnswers}
        onChange={this._onChange}
        onAnswer={this._onAnswer}
      />;
    }

    _onChange(index) {
      const selectedAnswers = this.state.selectedAnswers.slice(0);
      selectedAnswers[index] = !selectedAnswers[index];

      this.setState({
        selectedAnswers
      });
    }

    _onAnswer() {
      this.props.onAnswer(this.state.selectedAnswers);
    }
  }

  return WithSelectedAnswers;
};

export default withSelectedAnswers;
