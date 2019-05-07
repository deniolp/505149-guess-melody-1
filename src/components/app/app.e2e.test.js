import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './app.jsx';

configure({adapter: new Adapter()});

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
let app;

beforeEach(() => {
  const {questions} = mocks;
  app = mount(
      <App
        gameTime={0}
        errorCount={0}
        questions={questions}
      />);
});

it(`Onclick on welcome screen switches to the first question`, () => {
  const startButton = app.find(`.welcome__button`);
  startButton.simulate(`click`);
  app.update();

  const title = app.find(`.game__title`);
  expect(title).toHaveLength(1);
  expect(title.text).indexOf(`rock`).toBeGreaterThanOrEqual(0);
});
