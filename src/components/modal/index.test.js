import React from 'react';
import { mount } from 'enzyme';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Modal from './index';
import styles from './styles.css';

describe('<Modal />', () => {
  let wrapper;
  const props = {
    hideModal: jest.fn(),
    modal: {
      open: true,
      modalConfig: {
        title: 'The title',
        content: 'Please do something',
        label: 'The input'
      }
    },
    ModalContent: ''
  };

  beforeEach(() => {
    wrapper = mount(<Modal {...props} />);
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('has a <Dialog /> component', () => {
    expect(wrapper.find(Dialog)).toHaveLength(1);
  });

  it('has a <DialogTitle /> component with the right text', () => {
    expect(wrapper.find(DialogTitle)).toHaveLength(1);
    expect(wrapper.find(DialogTitle).text()).toBe('The title');
  });

  it('renders with the right css class', () => {
    expect(wrapper.find(DialogTitle).hasClass(`${styles.title}`)).toBeTruthy();
  });

  it('renders span element when there is no ModalContent component', () => {
    expect(wrapper.prop('ModalContent')).toHaveLength(0);
  });

  it('renders a ModalContent component when there is one', () => {
    const DummyElement = () => <div>asdf</div>;
    wrapper.setProps({ ModalContent: DummyElement });
    expect(wrapper.find(DummyElement)).toHaveLength(1);
  });
});
