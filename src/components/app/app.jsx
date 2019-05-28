import {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import withScreenSwitch from '../../hocs/with-screen-switch/with-screen-switch';

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

const mapSateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: state.step,
  mistakes: state.mistakes,
});

export {App};

export default withScreenSwitch(connect(mapSateToProps)(App));
