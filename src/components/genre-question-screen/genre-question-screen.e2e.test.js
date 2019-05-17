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
        genre: `rock`,
      },
    ],
  },
};
let genreQuestion;
let onAnswer;
let form;
let inputs;

beforeEach(() => {
  const {question} = mocks;
  onAnswer = jest.fn();

  genreQuestion = mount(
      <GenreQuestionScreen
        question={question}
        gameTime={2}
        mistakes={1}
        onAnswer={onAnswer}
      />
  );
  form = genreQuestion.find(`form`);
  inputs = genreQuestion.find(`input`);
  window.HTMLMediaElement.prototype.pause = () => {};
});

it(`When user clicks submit, form is not sent`, () => {
  form.simulate(`submit`, {preventDefault() {}});

  expect(onAnswer).toHaveBeenCalledTimes(1);
});

it(`When component is rendered, state.selectedAnswers is synchronized with inputs`, () => {
  expect(genreQuestion.state(`selectedAnswers`)).toEqual([false, false, false, false]);

  inputs.at(1).simulate(`change`, {
    preventDefault() {}
  });
  inputs.at(3).simulate(`change`, {
    preventDefault() {}
  });
  expect(genreQuestion.state(`selectedAnswers`)).toEqual([false, true, false, true]);
  inputs.at(3).simulate(`change`, {
    preventDefault() {}
  });
  expect(genreQuestion.state(`selectedAnswers`)).toEqual([false, true, false, false]);
});

it(`The user's answer passed in callback and it is synchronized with state`, () => {
  inputs.at(2).simulate(`change`, {
    preventDefault() {}
  });
  form.simulate(`submit`, {preventDefault() {}});

  expect(genreQuestion.state(`selectedAnswers`)).toEqual([false, false, true, false]);
  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(onAnswer).toHaveBeenNthCalledWith(1, [false, false, true, false]);
});
