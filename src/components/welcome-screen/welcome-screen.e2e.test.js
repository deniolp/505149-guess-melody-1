import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

const clickHandler = jest.fn();
const welcomeScreen = shallow(
    <WelcomeScreen
      gameTime={0}
      errorCount={0}
      onClick={clickHandler}
    />);

it(`Should have the button`, () => {
  const startButton = welcomeScreen.find(`.welcome__button`);
  expect(startButton).toHaveLength(1);
});

it(`Click on start game button works correctly`, () => {
  const startButton = welcomeScreen.find(`.welcome__button`);
  startButton.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
