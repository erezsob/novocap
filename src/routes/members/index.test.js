import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import { PrivateRoute } from './../../connected-components';
import { MembersRouter } from './';

describe('<MembersRouter />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MembersRouter location={{ pathname: '' }} />);
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders 1 <Route /> and 2 <PrivateRoute />', () => {
    expect(wrapper.find(Route)).toHaveLength(1);
    expect(wrapper.find(PrivateRoute)).toHaveLength(3);
  });
});
