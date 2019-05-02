import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app/app.jsx';

const init = () => {
  const settings = {
    gameTime: 7,
    errorCount: 4,
  };

  ReactDom.render(
      <App
        gameTime={settings.gameTime}
        errorCount={settings.errorCount}
      />,
      document.querySelector(`.main`)
  );
};

init();
