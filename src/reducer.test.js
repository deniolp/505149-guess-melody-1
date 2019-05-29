import MockAdapter from 'axios-mock-adapter';

import {reducer, ActionCreator, isArtistAnswerCorrect, isGenreAnswerCorrect, Operation} from './reducer';
import api from './api';

describe(`Reducer works correctly: `, () => {
  it(`if there is no parameters, should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      step: -1,
      mistakes: 0,
      questions: [],
    });
  });

  it(`should increment current step by given number`, () => {
    expect(reducer({
      step: 0,
      mistakes: 0,
    }, {
      type: `INCREMENT_STEP`,
      payload: 1,
    })).toEqual({
      step: 1,
      mistakes: 0,
    });
  });
  it(`should increment current mistake by given number`, () => {
    expect(reducer({
      step: 0,
      mistakes: 0,
    }, {
      type: `INCREMENT_MISTAKES`,
      payload: 1,
    })).toEqual({
      step: 0,
      mistakes: 1,
    });
  });
  it(`should reset state correctly`, () => {
    expect(reducer({
      step: 7687346,
      mistakes: 628,
    }, {
      type: `RESET`,
    })).toEqual({
      step: -1,
      mistakes: 0,
      questions: [],
    });
  });

  it(`should make correct API call to /questions`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const questionLoader = Operation.loadQuestions();

    apiMock.onGet(`/questions`).reply(200, [{a: true}]);

    return questionLoader(dispatch)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `LOAD_QUESTIONS`,
          payload: [{a: true}],
        });
      });
  });
});

describe(`Action creators work correctly: `, () => {
  it(`action creator for incrementing step returns correct action`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: `INCREMENT_STEP`,
      payload: 1,
    });
  });
});

describe(`Business logic is correct: `, () => {
  it(`artist answer is checked correctly`, () => {
    expect(isArtistAnswerCorrect({
      artist: `correct-artist`,
      picture: `correct-pic`,
    }, {
      type: `artist`,
      song: {
        artist: `correct-artist`,
        src: ``,
      },
      answers: [
        {
          artist: `incorrect-artist`,
          picture: `incorrect-pic`,
        },
        {
          artist: `correct-artist`,
          picture: `correct-pic`,
        },
        {
          artist: `incorrect-artist-2`,
          picture: `incorrect-pic`,
        },
      ]
    })).toBe(true);

    expect(isArtistAnswerCorrect({
      artist: `incorrect-artist-2`,
      picture: `incorrect-pic`,
    }, {
      type: `artist`,
      song: {
        artist: `correct-artist`,
        src: ``,
      },
      answers: [
        {
          artist: `incorrect-artist`,
          picture: `incorrect-pic`,
        },
        {
          artist: `correct-artist`,
          picture: `correct-pic`,
        },
        {
          artist: `incorrect-artist-2`,
          picture: `incorrect-pic`,
        },
      ]
    })).toBe(false);
  });

  it(`Genre question is checked correctly`, () => {
    expect(isGenreAnswerCorrect([false, true, true, false], {
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          genre: `jazz`,
          src: `0`,
        },
        {
          genre: `rock`,
          src: `1`,
        },
        {
          genre: `rock`,
          src: `2`,
        },
        {
          genre: `jazz`,
          src: `3`,
        },
      ]
    })).toEqual(true);


    expect(isGenreAnswerCorrect([false, false, false, true], {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `jazz`,
          src: `0`,
        },
        {
          genre: `jazz`,
          src: `1`,
        },
        {
          genre: `rock`,
          src: `2`,
        },
        {
          genre: `blues`,
          src: `3`,
        },
      ]
    })).toEqual(false);
  });
});
