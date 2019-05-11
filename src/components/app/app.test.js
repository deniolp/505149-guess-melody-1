import React from 'react';
import renderer from 'react-test-renderer';
import App from '../app/app';

const mocks = {
  questions: [
    {
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          src: `path`,
          genre: `blues`,
        },
        {
          src: `path`,
          genre: `jazz`,
        },
        {
          src: `path`,
          genre: `blues`,
        },
        {
          src: `path`,
          genre: `rock`,
        }
      ]
    }
  ]
};

describe(`App`, () => {
  it(`renders correctly`, () => {
    const {questions} = mocks;
    const tree = renderer.create(<App
      gameTime={0}
      errorCount={0}
      questions={questions}
      onClick = {jest.fn()}
    />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
