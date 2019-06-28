import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withSelectedAnswers from './with-selected-answers';

Enzyme.configure({adapter: new Adapter()});

const Mock = () => <div />;
const MockWrapped = withSelectedAnswers(Mock);
const mock = {
  question: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `path`,
        genre: `rock`,
      },
      {
        src: `path`,
        genre: `blues`,
      },
      {
        src: `path`,
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `rock`,
      },
    ],
  },
};

it(`Should transform`, () => {
  const wrapper = shallow(<MockWrapped
    answers={mock.question.answers}
    question={mock.question}
    onAnswer={jest.fn()}
  />);

  expect(wrapper.props().selectedAnswers).toEqual([false, false, false, false]);

  wrapper.props().onChange(1);
  expect(wrapper.props().selectedAnswers).toEqual([false, true, false, false]);

  wrapper.props().onChange(1);
  expect(wrapper.props().selectedAnswers).toEqual([false, false, false, false]);

  wrapper.props().onChange(2);
  expect(wrapper.props().selectedAnswers).toEqual([false, false, true, false]);
});
