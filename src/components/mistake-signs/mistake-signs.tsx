import * as React from 'react';

interface Props {
  mistakes: number,
}

class MistakeSigns extends React.PureComponent<Props, null> {
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

export default MistakeSigns;
