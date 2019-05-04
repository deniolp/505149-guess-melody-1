import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

let clickHandler;
let welcomeScreen;
let startButton;

beforeEach(() => {
  clickHandler = jest.fn();
  welcomeScreen = shallow(
      <WelcomeScreen
        gameTime={0}
        errorCount={0}
        onClick={clickHandler}
      />);
  startButton = welcomeScreen.find(`.welcome__button`);
});

it(`Should have the button`, () => {
  expect(startButton).toHaveLength(1);
});

it(`Click on start game button works correctly`, () => {
  startButton.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
