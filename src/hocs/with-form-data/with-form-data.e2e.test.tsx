import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import withFormData from './with-form-data';

Enzyme.configure({adapter: new Adapter()});

const Mock = () => <div />;
const MockWrapped = withFormData(Mock);
const mockNameInput = {
  target: {
    value: `Hi`,
  }
};
const mockPassordInput = {
  target: {
    value: `Den`,
  }
};

it(`Should change properties in state`, () => {
  const wrapper = Enzyme.shallow(<MockWrapped
    onChangeNameInput={jest.fn()}
    onChangePasswordInput={jest.fn()}
  />);

  expect(wrapper.props().formData).toEqual({});

  wrapper.props().onChangeNameInput(mockNameInput);
  expect(wrapper.props().formData).toEqual({
    name: `Hi`,
  });

  wrapper.props().onChangePasswordInput(mockPassordInput);
  expect(wrapper.props().formData).toEqual({
    name: `Hi`,
    password: `Den`,
  });
});
