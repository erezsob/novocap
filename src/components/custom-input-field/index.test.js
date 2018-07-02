import React from 'react';
import { mount } from 'enzyme';
import CustomInputField from './';
import styles from './styles.css';

describe('<CustomInputField />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <CustomInputField
        label="MyLabel"
        meta={{ touched: false, error: false }}
      />
    );
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders with the right css class', () => {
    expect(wrapper.find(`.${styles.container}`)).toHaveLength(1);
  });

  it('renders a label passed as prop', () => {
    const label = wrapper.find(`.${styles.label}`);
    expect(label).toHaveLength(1);
    expect(label.text()).toBe('MyLabel');
  });

  it('renders an `inputContainer`', () => {
    expect(wrapper.find(`.${styles.inputContainer}`)).toHaveLength(1);
  });

  it('renders an input element with class `input`', () => {
    const input = wrapper.find(`.${styles.input}`);
    expect(input).toHaveLength(1);
    expect(input.type()).toBe('input');
  });

  it('renders an input element of specific type', () => {
    wrapper.setProps({ type: 'fooType' });
    const input = wrapper.find(`.${styles.input}`);
    expect(input.props().type).toBe('fooType');
  });

  it('renders an input element with the given placeholder', () => {
    wrapper.setProps({ placeholder: 'fooBar' });
    const input = wrapper.find(`.${styles.input}`);
    expect(input.props().placeholder).toBe('fooBar');
  });

  describe('Input Error', () => {
    beforeEach(() => {
      wrapper.setProps({ meta: { touched: true, error: 'Required' } });
    });

    it('adds an error class to the container', () => {
      const container = wrapper.find(`.${styles.container}`);
      expect(container.hasClass(`${styles.error}`)).toBeTruthy();
    });

    it('adds an error class to the input element and replaces the placeholder with an error message', () => {
      const input = wrapper.find(`.${styles.input}`);
      expect(input.hasClass(`${styles.inputError}`)).toBeTruthy();
      expect(input.props().placeholder).toBe('Required');
    });
  });
});
