import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import GameOverScreen from '../game-over-screen/game-over-screen';

describe(`WelcomeScreen`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<BrowserRouter>
      <GameOverScreen
        onReplayButtonClick = {jest.fn()}
      />
    </BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
