import {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import withScreenSwitch from '../../hocs/with-screen-switch/with-screen-switch';
import {getStep} from '../../reducer/game/selectors';
import {getQuestions} from '../../reducer/data/selectors';

class App extends Component {
  render() {
    const {questions, step, renderScreen} = this.props;

    return renderScreen(questions[step]);
  }
}

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  renderScreen: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  step: getStep(state),
  questions: getQuestions(state),
});

export {App};

export default withScreenSwitch(connect(mapStateToProps)(App));
