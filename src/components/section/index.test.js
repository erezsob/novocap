import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Section from './';
import { SectionTitle } from '../../components';
import styles from './styles.css';

describe('<Section />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Section title="asdf" />);
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders with the right css class', () => {
    expect(wrapper.hasClass(`${styles.container}`)).toBeTruthy();
  });

  it('renders a <SectionTitle />', () => {
    expect(wrapper.find(SectionTitle)).toHaveLength(1);
  });

  it('renders properly', () => {
    const tree = renderer
      .create(
        <Section>
          <dummy-children>Dummy Child</dummy-children>
          <dummy-children>Dummy Child</dummy-children>
        </Section>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
