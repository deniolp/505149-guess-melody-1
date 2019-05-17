const initialState = {
  step: -1,
  mistakes: 0,
};

const ActionCreator = {
  incrementStep: () => ({
    type: `INCREMENT_STEP`,
    payload: 1,
  }),

  incrementMistake: (question, userAnswer, errorCount, mistakes) => {
    let isAnswerCorrect = false;

    switch (question) {
      case `genre`:
        isAnswerCorrect = false;
        break;
      case `artist`:
        isAnswerCorrect = true;
        break;
    }

    if (!isAnswerCorrect && mistakes + 1 >= errorCount) {
      return {
        type: `RESET`,
      };
    }

    return {
      type: `INCREMENT_MISTAKES`,
      payload: isAnswerCorrect ? 1 : 0,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `INCREMENT_STEP`: return Object.assign({}, state, {
      step: state.step + action.payload,
    });

    case `INCREMENT_MISTAKES`: return Object.assign({}, state, {
      mistakes: state.mistakes + action.payload,
    });

    case `RESET`: return Object.assign({}, initialState);
  }

  return state;
};

export {reducer, ActionCreator};
