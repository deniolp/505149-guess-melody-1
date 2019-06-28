import * as React from 'react';
import {Link} from "react-router-dom";

interface Props {
  onReplayButtonClick: () => void,
  mistakes: number,
}

const WinScreen = ({onReplayButtonClick, mistakes}: Props) => {
  return <section className="result">
    <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/></div>
    <h2 className="result__title">Вы настоящий меломан!</h2>
    <p className="result__total">Вы выиграли, , совершив {mistakes} ошибки(-у, -ок)</p>
    <Link
      to="/"
      className="replay"
      onClick={onReplayButtonClick}
    >Попробовать ещё раз</Link>
  </section>;
};

export default WinScreen;
