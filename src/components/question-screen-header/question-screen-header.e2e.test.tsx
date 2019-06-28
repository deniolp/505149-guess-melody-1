import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import QuestionScreenHeader from './question-screen-header';

Enzyme.configure({adapter: new Adapter()});

it(`Right amount of elements with attempts after rendering`, () => {
  const screenHeader = Enzyme.mount(<QuestionScreenHeader
    gameTime={2}
    mistakes={2}
  />);

  const attemptDiv = screenHeader.find(`.wrong`);

  expect(attemptDiv).toHaveLength(2);
});
