import React from 'react';
import ReactDom from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';

import App from './components/app/app';
import {createAPI} from './api';
import settings from './mocks/settings';
import reducer from './reducer/main-reducer';
import {Operation} from './reducer/data/data';

const init = () => {
  const api = createAPI((...arg) => store.dispatch(...arg));
  const store = createStore(reducer, compose(applyMiddleware(thunk.withExtraArgument(api)), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

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
