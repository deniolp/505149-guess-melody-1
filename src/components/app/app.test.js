import React from 'react';
import renderer from 'react-test-renderer';
import App from '../app/app.jsx';

describe(`App`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<App
      gameTime={0}
      errorCount={0}
      onClick = {jest.fn()}
    />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
