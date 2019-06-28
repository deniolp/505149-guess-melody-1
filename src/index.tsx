import * as React from 'react';
import * as ReactDom from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import App from './components/app/app';
import {createAPI} from './api';
import reducer from './reducer/main-reducer';
import {Operation} from './reducer/data/data';

const init = () => {
  const api = createAPI(() => history.pushState(null, null, `/result`));
  const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));

  store.dispatch(Operation.loadQuestions());

  ReactDom.render(<Provider store={store}>
    <App/>
  </Provider>,
  document.querySelector(`.main`)
  );
};

init();
