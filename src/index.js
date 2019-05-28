import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './components/app/app';
import settings from './mocks/settings';
import {reducer, ActionCreator} from './reducer';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const init = () => {
  store.dispatch(ActionCreator.loadQuestions());

  ReactDom.render(<Provider store={store}>
    <App
      gameTime={settings.GAMETIME}
      errorCount={settings.ERRORCOUNT}
    />
  </Provider>,
  document.querySelector(`.main`)
  );
};

init();
