import React from 'react';
import renderer from 'react-test-renderer';
import GameOverScreen from '../game-over-screen/game-over-screen';

describe(`WelcomeScreen`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<GameOverScreen
      onReplayButtonClick = {jest.fn()}
    />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
