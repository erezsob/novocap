import React from 'react';
import { shallow } from 'enzyme';
import Tint from './';

describe('<Tint />', () => {
  it('renders', () => {
    const toggleSidebarMock = jest.fn();
    const wrapper = shallow(<Tint toggleSidebar={toggleSidebarMock} />);
    expect(wrapper).toHaveLength(1);
  });
});
