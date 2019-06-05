import axios from 'axios';

export const createAPI = ((onLoginFail) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/guess-melody`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (error) => {
    if (error.response.status) {
      if (error.response.status === 403) {
        onLoginFail();
      }
    }
    throw error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
});
