import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './app';

configure({adapter: new Adapter()});

const questions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `path`,
        genre: `rock`,
      },
    ]
  },
  {
    type: `artist`,
    song: {
      artist: `John`,
      src: ``,
    },
    answers: [
      {
        picture: ``,
        artist: `John`,
      },
    ],
  }
];
let app;

beforeEach(() => {
  app = mount(
      <App
        gameTime={0}
        errorCount={0}
        questions={questions}
      />);
});

it(`Onclick on welcome screen switches to the first question`, () => {
  expect(app.state(`question`)).toEqual(-1);

  const startButton = app.find(`.welcome__button`);
  startButton.simulate(`click`);
  app.update();

  expect(app.state(`question`)).toEqual(0);

  const title = app.find(`.game__title`);
  expect(title).toHaveLength(1);
});

it(`Question answer switches to another question`, () => {
  app.setState({
    question: 0,
  });
  app.update();

  const form = app.find(`form`);
  form.simulate(`submit`, {
    preventDefault() {},
  });
  expect(app.state(`question`)).toEqual(1);
});

it(`Last question answer leads to the first screen`, () => {
  app.setState({
    question: questions.length - 1,
  });
  app.update();

  const form = app.find(`form`);
  form.simulate(`change`, {
    preventDefault() {},
  });
  expect(app.state(`question`)).toEqual(-1);
});
