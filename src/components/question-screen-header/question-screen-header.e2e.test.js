import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QuestionScreenHeader from './question-screen-header';

configure({adapter: new Adapter()});

it(`Right amount of elements with attempts after rendering`, () => {
  const screenHeader = shallow(<QuestionScreenHeader
    gameTime={2}
    errorCount={3}
  />);

  const attemptDiv = screenHeader.find(`.wrong`);

  expect(attemptDiv).toHaveLength(3);
});
