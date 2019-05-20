import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './components/app/app';
import settings from './mocks/settings';
import questions from './mocks/questions';
import {reducer} from './reducer';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const init = (gameQuestions) => {
  ReactDom.render(<Provider store={store}>
    <App
      gameTime={settings.GAMETIME}
      errorCount={settings.ERRORCOUNT}
      questions={gameQuestions}
    />
  </Provider>,
  document.querySelector(`.main`)
  );
};

init(questions);
