import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from './';
import { TimeFrameControls } from './../../components';
import { ConnectedBreakEven } from '../../connected-components';
import Charts from './../../containers/charts';

describe('<Dashboard />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Dashboard initDashboard={jest.fn()} />);
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('has a <TimeFrameControls /> component', () => {
    expect(wrapper.find(TimeFrameControls)).toHaveLength(1);
  });

  it('renders <ConnectedBreakEven />', () => {
    expect(wrapper.find(ConnectedBreakEven)).toHaveLength(1);
  });

  it('renders <Charts />', () => {
    expect(wrapper.find(Charts)).toHaveLength(1);
  });
});
