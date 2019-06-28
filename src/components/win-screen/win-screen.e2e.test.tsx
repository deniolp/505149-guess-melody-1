import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import WinScreen from './win-screen';

Enzyme.configure({adapter: new Adapter()});

let clickHandler;
let winScreen;
let replayButton;

beforeEach(() => {
  clickHandler = jest.fn();
  winScreen = Enzyme.shallow(
      <WinScreen
        mistakes={3}
        onReplayButtonClick={clickHandler}
      />);
  replayButton = winScreen.find(`.replay`);
});

describe(`Before clicking`, () => {
  it(`should have the button`, () => {
    expect(replayButton).toHaveLength(1);
  });

  it(`clickHandler should not be called`, () => {
    expect(clickHandler).toHaveBeenCalledTimes(0);
  });
});

describe(`After clicking`, () => {
  it(`clickHandler should be called once`, () => {
    replayButton.simulate(`click`);

    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
