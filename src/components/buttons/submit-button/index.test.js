import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import SubmitButton from './';

describe('<SubmitButton />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SubmitButton />);
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
  });

  describe('renders properly', () => {
    const tree = renderer.create(<SubmitButton />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('has the correct type attribute', () => {
    expect(wrapper.dive().find('[type="submit"]')).toHaveLength(1);
  });
});
