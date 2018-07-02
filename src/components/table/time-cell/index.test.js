import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import TimeCell from './';
import styles from './styles.css';

describe('<TimeCell />', () => {
  const date = '2017-05-30T19:37:29Z';
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TimeCell date={date} />);
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders properly', () => {
    const tree = renderer.create(<TimeCell date={date} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with the right css class', () => {
    expect(wrapper.find(`.${styles.dateMonth}`)).toHaveLength(1);
    expect(wrapper.find(`.${styles.dateHours}`)).toHaveLength(1);
  });

  it('renders the correct time format', () => {
    expect(wrapper.find(`.${styles.dateMonth}`).text()).toBe('30. May');
    expect(wrapper.find(`.${styles.dateHours}`).text()).toBe('19:37h');
  });
});
