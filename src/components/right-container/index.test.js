import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import RightContainer from './';
import { WIDGETS_CONTAINER_ID } from './../../constants';

describe('<RightContainer />', () => {
  it('renders with the right ID', () => {
    const wrapper = shallow(<RightContainer />);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.props().id).toBe(WIDGETS_CONTAINER_ID);
  });

  it('renders children passed as props', () => {
    const wrapper = shallow(
      <RightContainer>
        <div>Dummy Child</div>
        <div>Dumb Child</div>
      </RightContainer>
    );
    expect(wrapper.children()).toHaveLength(2);
  });

  it('renders properly', () => {
    const tree = renderer.create(<RightContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
