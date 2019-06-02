import React from 'react';
import renderer from 'react-test-renderer';
import {AuthorizationScreen} from '../authorization-screen/authorization-screen';

describe(`AuthorizationScreen`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<AuthorizationScreen
      onReplayButtonClick = {jest.fn()}
      mistakes={2}
      authError={`Bad guy`}
      onChangeNameInput={jest.fn()}
      onChangePasswordInput={jest.fn()}
      submitForm={jest.fn()}
      formData={{
        name: `hdg@ya.ru`,
        password: `uy`,
      }}
    />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
