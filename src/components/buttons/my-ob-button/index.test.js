import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import AwesomeIcon from 'material-ui-icons/BatteryCharging30';
import MyOBButton from './';

describe('<MyOBButton />', () => {
  const mockAction = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MyOBButton text="Dummy" action={mockAction} />);
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
  });

  describe('renders properly', () => {
    test('with icon', () => {
      const tree = renderer.create(
        <MyOBButton text="Dummy" icon={<AwesomeIcon />} />
      );
      expect(tree.toJSON()).toMatchSnapshot();
    });

    test('without icon', () => {
      const tree = renderer.create(<MyOBButton text="Dummy" />);
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  it('triggers an action onClick event', () => {
    wrapper.find('button').simulate('click');
    expect(mockAction).toHaveBeenCalledTimes(1);
  });
});
