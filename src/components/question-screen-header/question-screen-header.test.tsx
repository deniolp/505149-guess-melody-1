import React from 'react';
import renderer from 'react-test-renderer';
import QuestionScreenHeader from './question-screen-header';

describe(`QuestionScreenHeader`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<QuestionScreenHeader
      gameTime={3}
      mistakes={2}
    />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
