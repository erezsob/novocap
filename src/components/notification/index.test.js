import React from 'react';
import { mount } from 'enzyme';
import SuccessIcon from 'material-ui-icons/CheckCircle';
import WarningIcon from 'material-ui-icons/InfoOutline';
import ErrorIcon from 'material-ui-icons/ReportProblem';
import CloseIcon from 'material-ui-icons/Clear';
import Notification from './';
import { NOTIFICATION } from './../../constants';
import styles from './styles.css';

describe('<Notification />', () => {
  const notification = {
    isActive: true,
    message: '',
    type: ''
  };
  const mockHideNotification = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Notification
        notification={notification}
        hideNotification={mockHideNotification}
      />
    );
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find(`.${styles.container}`)).toHaveLength(1);
  });

  it('does not render if inactive', () => {
    wrapper.setProps({ notification: { isActive: false } });
    expect(wrapper.find(`.${styles.container}`)).toHaveLength(0);
  });

  it('renders a message', () => {
    const message = 'This is not a drill!';
    wrapper.setProps({ notification: { isActive: true, message } });
    expect(wrapper.find(`.${styles.message}`).text()).toBe(message);
  });

  describe('<CloseIcon />', () => {
    it('renders', () => {
      expect(wrapper.find(CloseIcon)).toHaveLength(1);
    });

    it('dismisses the notification on click', () => {
      wrapper.find(CloseIcon).simulate('click');
      expect(mockHideNotification).toHaveBeenCalledTimes(1);
    });
  });

  describe('`NOTIFICATION.SUCCESS`', () => {
    beforeEach(() => {
      wrapper.setProps({
        notification: { isActive: true, type: NOTIFICATION.SUCCESS }
      });
    });

    it('renders a `<SuccessIcon />`', () => {
      expect(wrapper.find(SuccessIcon)).toHaveLength(1);
    });

    it('renders with a `success` class', () => {
      expect(wrapper.find(`.${styles.success}`)).toHaveLength(1);
    });
  });

  describe('`NOTIFICATION.ERROR`', () => {
    beforeEach(() => {
      wrapper.setProps({
        notification: { isActive: true, type: NOTIFICATION.ERROR }
      });
    });

    it('renders a `<ErrorIcon />`', () => {
      expect(wrapper.find(ErrorIcon)).toHaveLength(1);
    });

    it('renders with a `error` class', () => {
      expect(wrapper.find(`.${styles.error}`)).toHaveLength(1);
    });
  });

  describe('`NOTIFICATION.WARNING`', () => {
    beforeEach(() => {
      wrapper.setProps({
        notification: { isActive: true, type: NOTIFICATION.WARNING }
      });
    });

    it('renders a `<WarningIcon />`', () => {
      expect(wrapper.find(WarningIcon)).toHaveLength(1);
    });

    it('renders with a `warning` class', () => {
      expect(wrapper.find(`.${styles.warning}`)).toHaveLength(1);
    });
  });
});
