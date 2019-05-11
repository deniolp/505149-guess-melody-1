import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GenreQuestionScreen from './genre-question-screen';

configure({adapter: new Adapter()});

const mocks = {
  question: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `path`,
        genre: `rock`,
      },
    ],
  },
};

it(`When user clicks submit, form is not sent`, () => {
  const {question} = mocks;
  const onAnswer = jest.fn();
  const genreQuestion = mount(<GenreQuestionScreen
    onAnswer={onAnswer}
    gameTime={2}
    errorCount={3}
    question={question}
  />);

  const form = genreQuestion.find(`form`);
  const formSendPrevention = jest.fn();
  form.simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);
});
