import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class MistakeSigns extends PureComponent {
  render() {
    const {mistakes} = this.props;
    return <div className="game__mistakes">
      {this._showAmountOfMistakes(mistakes)}
    </div>;
  }

  _showAmountOfMistakes(count) {
    const mistakesElements = [];
    for (let i = 0; i < count; i++) {
      mistakesElements.push(<div className="wrong" key={i}></div>);
    }
    return mistakesElements;
  }
}

MistakeSigns.propTypes = {
  mistakes: PropTypes.number.isRequired,
};

export default MistakeSigns;
