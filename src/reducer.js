const initialState = {
  step: -1,
  mistakes: 0,
  questions: [],
};

const isArtistAnswerCorrect = (userAnswer, question) => {
  return userAnswer.artist === question.song.artist;
};

const isGenreAnswerCorrect = (userAnswer, question) => userAnswer.every((it, i) => it === (question.answers[i].genre === question.genre));

const Operation = {
  loadQuestions: () => (dispatch) => {
    return fetch(`https://es31-server.appspot.com/guess-melody/questions`)
      .then((response) => response.json())
      .then((questions) => {
        dispatch(ActionCreator.loadQuestions(questions));
      });
  }
};

const ActionCreator = {
  incrementStep: () => ({
    type: `INCREMENT_STEP`,
    payload: 1,
  }),

  incrementMistake: (question, userAnswer) => {
    let isAnswerCorrect = false;

    switch (question.type) {
      case `genre`:
        isAnswerCorrect = isGenreAnswerCorrect(userAnswer, question);
        break;
      case `artist`:
        isAnswerCorrect = isArtistAnswerCorrect(userAnswer, question);
        break;
    }

    return {
      type: `INCREMENT_MISTAKES`,
      payload: isAnswerCorrect ? 0 : 1,
    };
  },

  loadQuestions: (questions) => {
    return {
      type: `LOAD_QUESTIONS`,
      payload: questions,
    };
  },

  resetGame: () => {
    return {
      type: `RESET`,
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

    case `LOAD_QUESTIONS`: return Object.assign({}, state, {
      questions: action.payload,
    });

    case `RESET`: return Object.assign({}, initialState);
  }

  return state;
};

export {reducer, ActionCreator, isArtistAnswerCorrect, isGenreAnswerCorrect, Operation};
