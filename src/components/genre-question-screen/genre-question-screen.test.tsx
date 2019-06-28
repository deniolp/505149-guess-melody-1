import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {GenreQuestionScreen} from './genre-question-screen';
import {Type} from "../../types";

const mock = {
  question: {
    type: Type.GENRE,
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
      mistakes={2}
      onAnswer={jest.fn()}
      onChange={jest.fn()}
      renderAnswer={jest.fn()}
      selectedAnswers={[false, false, false, false]}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
