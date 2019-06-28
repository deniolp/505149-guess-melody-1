import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import {GenreQuestionScreen} from './genre-question-screen';
import withSelectedAnswers from '../../hocs/with-selected-answers/with-selected-answers';
import {Type} from "../../types";

Enzyme.configure({adapter: new Adapter()});

const mocks = {
  question: {
    type: Type.GENRE,
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

it(`When user clicks submit, form is not sent`, () => {
  const {question} = mocks;
  onAnswer = jest.fn();

  genreQuestion = Enzyme.shallow(
      <GenreQuestionScreen
        question={question}
        gameTime={2}
        mistakes={1}
        onAnswer={onAnswer}
        onChange={jest.fn()}
        renderAnswer={jest.fn()}
        selectedAnswers={[]}
      />
  );
  form = genreQuestion.find(`form`);
  inputs = genreQuestion.find(`input`);
  (window as any).HTMLMediaElement.prototype.pause = () => {};

  form.simulate(`submit`, {preventDefault() {}});

  expect(onAnswer).toHaveBeenCalledTimes(1);
});

it(`When component is rendered, inputs are synchronized with prop.selectedAnswers`, () => {
  const GenreQuestionScreenWrapped = withSelectedAnswers(GenreQuestionScreen);

  const {question} = mocks;
  onAnswer = jest.fn();

  genreQuestion = Enzyme.shallow(
      <GenreQuestionScreenWrapped
        question={question}
        gameTime={2}
        mistakes={1}
        onAnswer={onAnswer}
        onChange={jest.fn()}
        renderAnswer={jest.fn()}
      />
  );
  inputs = genreQuestion.dive().find(`input`);
  (window as any).HTMLMediaElement.prototype.pause = () => {};

  expect(genreQuestion.prop(`selectedAnswers`)).toEqual([false, false, false, false]);

  inputs.at(1).simulate(`change`, {
    preventDefault() {}
  });
  inputs.at(3).simulate(`change`, {
    preventDefault() {}
  });
  expect(genreQuestion.prop(`selectedAnswers`)).toEqual([false, true, false, true]);
  inputs.at(3).simulate(`change`, {
    preventDefault() {}
  });
  expect(genreQuestion.prop(`selectedAnswers`)).toEqual([false, true, false, false]);
});

it(`The user's answer passed to callback and it is synchronized with prop.selectedAnswers`, () => {
  const {question} = mocks;
  onAnswer = jest.fn();

  genreQuestion = Enzyme.mount(
      <GenreQuestionScreen
        question={question}
        gameTime={2}
        mistakes={1}
        onAnswer={onAnswer}
        onChange={jest.fn()}
        renderAnswer={jest.fn()}
        selectedAnswers={[false, false, true, false]}
      />
  );
  form = genreQuestion.find(`form`);
  (window as any).HTMLMediaElement.prototype.pause = () => {};

  genreQuestion.find(`input`).at(2).simulate(`change`, {
    preventDefault() {}
  });
  form.simulate(`submit`, {preventDefault() {}});

  expect(genreQuestion.find(`input`).map((it) => it.prop(`checked`)))
    .toEqual([false, false, true, false]);
  expect(onAnswer).toHaveBeenCalledTimes(1);
});
