import React from 'react';
import renderer from 'react-test-renderer';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';

const mock = {
  question: {
    type: `genre`,
    genre: `blues`,
    answers: [
      {
        src: ``,
        genre: `blues`,
      },
      {
        src: ``,
        genre: `rock`,
      },
      {
        src: ``,
        genre: `jazz`,
      },
      {
        src: ``,
        genre: `blues`,
      }
    ]
  }
};

describe(`GenreQuestionScreen`, () => {
  it(`renders correctly`, () => {
    const {question} = mock;
    const tree = renderer.create(<GenreQuestionScreen
      question={question}
      gameTime={2}
      errorCount={3}
      onAnswer={jest.fn()}
    />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
