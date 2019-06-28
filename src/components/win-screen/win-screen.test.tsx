import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import WinScreen from './win-screen';

describe(`WelcomeScreen`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<BrowserRouter>
      <WinScreen
        mistakes={0}
        onReplayButtonClick = {jest.fn()}
      />
    </BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
