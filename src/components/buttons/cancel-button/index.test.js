import React from 'react';
import { shallow } from 'enzyme';
import Button from 'material-ui/Button';
import renderer from 'react-test-renderer';
import CancelButton from './';

describe('<CancelButton />', () => {
  const mockAction = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CancelButton action={mockAction} />);
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders properly', () => {
    const tree = renderer.create(<CancelButton action={mockAction} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('triggers an action onClick event', () => {
    wrapper
      .dive()
      .find(Button)
      .simulate('click');
    expect(mockAction).toHaveBeenCalledTimes(1);
  });
});
