import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Footer from './';
import styles from './styles.css';

describe('<Footer />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Footer />);
  });

  it('renders properly', () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(wrapper).toHaveLength(1);
  });

  it('renders with a class `footer`', () => {
    expect(wrapper.hasClass(`${styles.footer}`)).toBeTruthy();
  });

  it('renders a section with class `legal`', () => {
    expect(wrapper.find(`.${styles.legal}`)).toHaveLength(1);
  });

  it('renders 6 legal links', () => {
    expect(wrapper.find(`.${styles.legal}`).children()).toHaveLength(6);
  });

  it('renders a section with class `languages`', () => {
    expect(wrapper.find(`.${styles.languages}`)).toHaveLength(1);
  });

  it('renders 3 language links', () => {
    expect(wrapper.find(`.${styles.languages}`).children()).toHaveLength(3);
  });

  it('properly renders a section with class `company`', () => {
    const section = wrapper.find(`.${styles.company}`);
    expect(section).toHaveLength(1);
    expect(section.childAt(0).text()).toBe('orderbird AG ©');
    expect(section.childAt(1).text()).toBe(`${new Date().getFullYear()}`);
  });
});
