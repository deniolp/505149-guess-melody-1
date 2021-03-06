import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import {AuthorizationScreen} from './authorization-screen';

describe(`AuthorizationScreen`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<BrowserRouter>
      <AuthorizationScreen
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
        user={{}}
        history={{
          push: jest.fn()
        }}
      />
    </BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
