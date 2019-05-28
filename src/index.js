import React from 'react';
import ReactDom from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';

import App from './components/app/app';
import settings from './mocks/settings';
import {reducer, loadQuestions} from './reducer';

const store = createStore(reducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

const init = () => {
  store.dispatch(loadQuestions());

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
