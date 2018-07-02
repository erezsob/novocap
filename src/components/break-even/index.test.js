import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { BreakEven } from '../../components';

describe('<BreakEven />', () => {
  let wrapper;
  let spyComponentDidMount;
  let spyFetchRevenueBreakEven;

  beforeEach(() => {
    spyComponentDidMount = jest.spyOn(BreakEven.prototype, 'componentDidMount');
    spyFetchRevenueBreakEven = jest.fn();
    wrapper = shallow(
      <BreakEven fetchRevenueBreakEven={spyFetchRevenueBreakEven} />
    ).dive();
  });

  afterEach(() => {
    spyComponentDidMount.mockClear();
    spyFetchRevenueBreakEven.mockClear();
  });

  test('renders', () => {
    expect(wrapper).toHaveLength(1);
  });

  test('renders properly', () => {
    const tree = renderer
      .create(<BreakEven fetchRevenueBreakEven={spyFetchRevenueBreakEven} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Lifecycle methods', () => {
    test('componentDidMount()', () => {
      expect(spyComponentDidMount).toHaveBeenCalledTimes(1);
      expect(spyFetchRevenueBreakEven).toHaveBeenCalledTimes(1);
    });
  });
});
