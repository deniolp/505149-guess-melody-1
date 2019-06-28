import * as React from 'react';
import * as renderer from 'react-test-renderer';

import WelcomeScreen from './welcome-screen';

describe(`WelcomeScreen`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<WelcomeScreen
      gameTime={0}
      errorCount={0}
      onStartButtonClick = {jest.fn()}
    />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
