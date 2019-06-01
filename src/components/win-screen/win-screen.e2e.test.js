import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WinScreen from '../win-screen/win-screen';

Enzyme.configure({adapter: new Adapter()});

let clickHandler;
let winScreen;
let replayButton;

beforeEach(() => {
  clickHandler = jest.fn();
  winScreen = shallow(
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
