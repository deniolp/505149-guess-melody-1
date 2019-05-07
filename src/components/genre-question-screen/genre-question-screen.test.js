import React from 'react';
import renderer from 'react-test-renderer';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen.jsx';

const mock = {
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
};

describe(`GenreQuestionScreen`, () => {
  it(`renders correctly`, () => {
    const {answers, genre} = mock;
    const tree = renderer.create(<GenreQuestionScreen
      answers={answers}
      genre={genre}
    />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
