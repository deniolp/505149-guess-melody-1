import reducer from './reducer';

describe(`Reducer works correctly: `, () => {
  it(`if there is no parameters, should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      step: -1,
      mistakes: 0,
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
    });
  });
});
