import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withSelectedAnswers = (Component) => {
  class WithSelectedAnswers extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        selectedAnswers: new Array(props.question.answers.length).fill(false),
      };
    }

    render() {
      const {onAnswer} = this.props;

      return <Component
        {...this.props}
        selectedAnswers={this.state.selectedAnswers}
        onChange={(index) => {
          const selectedAnswers = this.state.selectedAnswers.slice(0);
          selectedAnswers[index] = !selectedAnswers[index];

          this.setState({
            selectedAnswers
          });
        }}
        onAnswer={() => onAnswer(this.state.selectedAnswers)}
      />;
    }
  }

  WithSelectedAnswers.propTypes = {
    question: PropTypes.shape({
      answers: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string.isRequired,
        genre: PropTypes.oneOf([`blues`, `rock`, `jazz`]).isRequired,
      })).isRequired,
      genre: PropTypes.oneOf([`blues`, `rock`, `jazz`]).isRequired,
      type: PropTypes.oneOf([`genre`, `artist`]).isRequired,
    }).isRequired,
    onAnswer: PropTypes.func.isRequired,
  };

  return WithSelectedAnswers;
};

export default withSelectedAnswers;
