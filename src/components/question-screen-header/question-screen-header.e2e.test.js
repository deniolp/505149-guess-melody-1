import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QuestionScreenHeader from './question-screen-header';

configure({adapter: new Adapter()});

it(`Right amount of elements with attempts after rendering`, () => {
  const screenHeader = mount(<QuestionScreenHeader
    gameTime={2}
    mistakes={2}
  />);

  const attemptDiv = screenHeader.find(`.wrong`);

  expect(attemptDiv).toHaveLength(2);
});
