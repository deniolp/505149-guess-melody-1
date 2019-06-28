import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import withActivePlayer from './with-active-player';

Enzyme.configure({adapter: new Adapter()});

const Mock = () => <div />;
const MockWrapped = withActivePlayer(Mock);

it(`activePlayer should be -1`, () => {
  const wrapper = Enzyme.shallow(<MockWrapped />);

  expect(wrapper.state().activePlayer).toEqual(-1);
});
