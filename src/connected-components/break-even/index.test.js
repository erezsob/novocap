import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import ConnectedBreakEven from './index';

const mockStore = configureStore([thunk]);
const initialState = {
  breakEvenPercent: 0,
  timeFrame: 'monthly',
  monthlyCosts: 100
};
const store = mockStore(initialState);

describe('<ConnectedBreakEven />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ConnectedBreakEven store={store} />);
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
  });
});
