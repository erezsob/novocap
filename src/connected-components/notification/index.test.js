import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import Notification from './';

const mockStore = configureStore([thunk]);
const initialState = {
  isActive: true,
  message: '',
  type: ''
};
const store = mockStore(initialState);

describe('<Notification />', () => {
  it('renders', () => {
    const wrapper = shallow(<Notification store={store} />);
    expect(wrapper).toHaveLength(1);
  });
});
