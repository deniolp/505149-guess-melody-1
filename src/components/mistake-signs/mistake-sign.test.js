import React from 'react';
import renderer from 'react-test-renderer';
import MistakeSigns from '../mistake-signs/mistake-signs';

describe(`QuestionScreenHeader`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<MistakeSigns
      mistakes={2}
    />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
