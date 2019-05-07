import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app/app.jsx';
import settings from './mocks/settings';
import questions from './mocks/questions';

const startGame = () => {};

const init = (gameQuestions) => {
  ReactDom.render(
      <App
        gameTime={settings.GAMETIME}
        errorCount={settings.ERRORCOUNT}
        onClick={startGame}
        questions={gameQuestions}
      />,
      document.querySelector(`.main`)
  );
};

init(questions);
