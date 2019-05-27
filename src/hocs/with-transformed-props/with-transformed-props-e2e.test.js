import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withTransformedProps from './with-transformed-props';

Enzyme.configure({adapter: new Adapter()});

const Mock = () => <div />;
const transformFunc = (oldProps) => {
  return {
    foos: oldProps.foo,
    bars: oldProps.bar,
  };
};
const MockWrapped = withTransformedProps(transformFunc)(Mock);

it(`Should transform`, () => {
  const wrapper = shallow(<MockWrapped
    foo={`foo`}
    bar={`bar`}
  />);

  expect(wrapper.props().foo).toEqual(undefined);
  expect(wrapper.props().bar).toEqual(undefined);

  expect(wrapper.props().foos).toEqual(`foo`);
  expect(wrapper.props().bars).toEqual(`bar`);
});
