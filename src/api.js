import axios from 'axios';
import {ActionCreator} from './reducer/game/game';

export const createAPI = ((dispatch) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/guess-melody`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (error) => {
    if (error.response.status === 403) {
      dispatch(ActionCreator.resetGame());
    }
    return error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
});
