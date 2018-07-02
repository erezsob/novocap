import React from 'react';
import { shallow } from 'enzyme';
import { RadioGroup } from 'material-ui/Radio';
import TimeFrameControls from './';
import styles from './styles.css';

describe('<TimeFrameControls />', () => {
  const onChangeHandler = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TimeFrameControls handleChange={onChangeHandler} />);
  });
  test('renders with the right css class', () => {
    expect(wrapper.hasClass(`${styles.controls}`)).toBeTruthy();
  });

  test('renders a <RadioGroup /> with three options', () => {
    expect(wrapper.find(RadioGroup)).toHaveLength(1);
    expect(wrapper.find(RadioGroup).children()).toHaveLength(3);
  });

  test('the onChange handler is called on change event', () => {
    wrapper.find(RadioGroup).simulate('change');
    expect(onChangeHandler).toHaveBeenCalledTimes(1);
  });
});
