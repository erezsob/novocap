import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import LogoUploader from './';

describe('<LogoUploader />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LogoUploader />);
  });

  it('renders properly', () => {
    const tree = renderer.create(<LogoUploader />);
    expect(tree.toJSON()).toMatchSnapshot();
    expect(wrapper).toHaveLength(1);
  });
});
