import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';

it(`WelcomeScreen renders correctly`, () => {
  const tree = renderer.create(<WelcomeScreen
    gameTime={0}
    errorCount={0}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
