import React from 'react';
import renderer from 'react-test-renderer';
import WinScreen from '../win-screen/win-screen';

describe(`WelcomeScreen`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<WinScreen
      mistakes={0}
      onReplayButtonClick = {jest.fn()}
    />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
