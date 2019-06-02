const initialState = {
  isAuthorizationRequired: true,
  user: null,
};

const Operation = {
  authorizeUser: (email, password) => (dispatch, _getState, api) => {
    return api.post(`/login`, {email, password})
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(false));
        dispatch(ActionCreator.authorizeUser(response.data));
      })
      .catch((error) => global.console.log(error));
  }
};

const ActionCreator = {
  requireAuthorization: (status) => ({
    type: `REQUIRE_AUTHORIZATION`,
    payload: status,
  }),

  authorizeUser: (user) => ({
    type: `AUTHORIZE_USER`,
    payload: user,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `REQUIRE_AUTHORIZATION`: return Object.assign({}, state, {
      isAuthorizationRequired: action.payload,
    });

    case `AUTHORIZE_USER`: return Object.assign({}, state, {
      user: action.payload,
    });
  }

  return state;
};

export {reducer, ActionCreator, Operation};
