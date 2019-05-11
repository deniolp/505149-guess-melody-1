import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app/app';
import settings from './mocks/settings';
import questions from './mocks/questions';

const init = (gameQuestions) => {
  ReactDom.render(
      <App
        gameTime={settings.GAMETIME}
        errorCount={settings.ERRORCOUNT}
        questions={gameQuestions}
      />,
      document.querySelector(`.main`)
  );
};

init(questions);
