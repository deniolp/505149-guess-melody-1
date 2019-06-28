import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {AuthorizationScreen} from './authorization-screen';

Enzyme.configure({adapter: new Adapter()});

let replayClickHandler;
let submitClickHandler;
let authorizationScreen;
let replayButton;
let submitButton;

beforeEach(() => {
  replayClickHandler = jest.fn();
  submitClickHandler = jest.fn();
  authorizationScreen = shallow(
      <AuthorizationScreen
        onReplayButtonClick = {replayClickHandler}
        mistakes={2}
        authError={``}
        onChangeNameInput={jest.fn()}
        onChangePasswordInput={jest.fn()}
        submitForm={submitClickHandler}
        formData={{
          name: `hdg@ya.ru`,
          password: `uy`,
        }}
      />);
  replayButton = authorizationScreen.find(`.replay`);
  submitButton = authorizationScreen.find(`.login__button`);
});

describe(`Before clicking`, () => {
  it(`should have the buttons`, () => {
    expect(replayButton).toHaveLength(1);
    expect(submitButton).toHaveLength(1);
  });

  it(`clickHandlers should not be called`, () => {
    expect(replayClickHandler).toHaveBeenCalledTimes(0);
    expect(submitClickHandler).toHaveBeenCalledTimes(0);
  });
});

describe(`After clicking`, () => {
  it(`replayClickHandler should be called once and submitClickHandler should not be called due to preventDefault`, () => {
    replayButton.simulate(`click`);
    submitButton.simulate(`click`);

    expect(replayClickHandler).toHaveBeenCalledTimes(1);
    expect(submitClickHandler).toHaveBeenCalledTimes(0);
  });
});
