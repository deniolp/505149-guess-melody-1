import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.USER;


export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].isAuthorizationRequired;
};

export const getAuthError = (state) => {
  return state[NAME_SPACE].authError && state[NAME_SPACE].authError;
};

export const getUser = (state) => {
  return state[NAME_SPACE].user;
};
