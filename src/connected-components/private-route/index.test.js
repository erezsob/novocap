import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import { PrivateRoute } from './';

describe('<PrivateRoute />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <PrivateRoute isAthenticated={false} component={<div />} path="/" />
    );
  });

  test('renders', () => {
    expect(wrapper).toHaveLength(1);
  });

  test('renders a <Route /> component', () => {
    expect(wrapper.find(Route)).toHaveLength(1);
  });
});
