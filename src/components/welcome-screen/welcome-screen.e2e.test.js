import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from '../welcome-screen/welcome-screen';

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

describe(`Before clicking`, () => {
  it(`should have the button`, () => {
    expect(startButton).toHaveLength(1);
  });

  it(`clickHandler should not be called`, () => {
    expect(clickHandler).toHaveBeenCalledTimes(0);
  });
});

describe(`After clicking`, () => {
  it(`clickHandler should be called once`, () => {
    startButton.simulate(`click`);

    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
