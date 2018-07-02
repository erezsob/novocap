import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { CostsForm } from '../index';
import ConnectedModal from './index';

const mockStore = configureStore([thunk]);
const initialState = {
  modal: {
    open: true,
    modalConfig: {
      modalContentType: 'COSTS_FORM'
    }
  },
  hideModal: jest.fn
};
const store = mockStore(initialState);

describe('<ConnectedModal />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ConnectedModal store={store} />);
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('gets <CostsForm /> as a ModalContent prop', () => {
    expect(wrapper.prop('ModalContent')).toBe(CostsForm);
  });
});
