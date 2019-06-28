import React from 'react';
import ReactDom from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';

import App from './components/app/app';
import {createAPI} from './api';
import reducer from './reducer/main-reducer';
import {Operation} from './reducer/data/data';

const settings = {
  GAMETIME: 5,
  ERRORCOUNT: 3,
};

const init = () => {
  const api = createAPI(() => history.pushState(null, null, `/result`));
  const store = createStore(reducer, compose(applyMiddleware(thunk.withExtraArgument(api)), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (a) => a));

  store.dispatch(Operation.loadQuestions());

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
