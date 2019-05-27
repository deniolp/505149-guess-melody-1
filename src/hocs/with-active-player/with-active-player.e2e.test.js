import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withActivePlayer from './with-active-player';

Enzyme.configure({adapter: new Adapter()});

const Mock = () => <div />;
const MockWrapped = withActivePlayer(Mock);

it(`activePlayer should be -1`, () => {
  const wrapper = shallow(<MockWrapped />);

  expect(wrapper.state().activePlayer).toEqual(-1);
});
