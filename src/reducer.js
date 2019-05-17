const initialState = {
  step: -1,
  mistakes: 0,
};

const isArtistAnswerCorrect = (userAnswer, question) => {
  return userAnswer.artist === question.song.artist;
};


const isGenreAnswerCorrect = (userAnswer, question) => userAnswer.every((it, i) => it === (question.answers[i].genre === question.genre));

const ActionCreator = {
  incrementStep: () => ({
    type: `INCREMENT_STEP`,
    payload: 1,
  }),

  incrementMistake: (question, questionsLength, userAnswer, errorCount, mistakes, step) => {
    let isAnswerCorrect = false;

    switch (question.type) {
      case `genre`:
        isAnswerCorrect = isGenreAnswerCorrect(userAnswer, question);
        break;
      case `artist`:
        isAnswerCorrect = isArtistAnswerCorrect(userAnswer, question);
        break;
    }

    if (!isAnswerCorrect && mistakes + 1 >= errorCount || step >= questionsLength - 1) {
      return {
        type: `RESET`,
      };
    }

    return {
      type: `INCREMENT_MISTAKES`,
      payload: isAnswerCorrect ? 0 : 1,
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

export {reducer, ActionCreator, isArtistAnswerCorrect, isGenreAnswerCorrect};
