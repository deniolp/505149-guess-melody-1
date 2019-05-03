import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app/app.jsx';

const init = () => {
  const Settings = {
    GAMETIME: 7,
    ERRORCOUNT: 4,
  };

  ReactDom.render(
      <App
        gameTime={Settings.GAMETIME}
        errorCount={Settings.ERRORCOUNT}
      />,
      document.querySelector(`.main`)
  );
};

init();
