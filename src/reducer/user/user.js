const initialState = {
  isAuthorizationRequired: true,
};

const ActionCreator = {
  requireAuthorization: (status) => ({
    type: `REQUIRE_AUTHORIZATION`,
    payload: status,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `REQUIRE_AUTHORIZATION`: return Object.assign({}, state, {
      isAuthorizationRequired: action.payload,
    });
  }

  return state;
};

export {reducer, ActionCreator};
