import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { LinearProgress } from 'material-ui/Progress';
import ConnectedPageLayout, { PageLayout } from './';
import { ConnectedModal, Notification } from '../../connected-components';
import {
  RightContainer,
  Header,
  Sidebar,
  Tint,
  Footer
} from '../../components';
import styles from './styles.css';

describe('<PageLayout />', () => {
  const handleResizeMock = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <PageLayout
        isResponsiveSidebarOpen={false}
        handleResize={handleResizeMock}
        fetchVenue={jest.fn()}
      />
    );
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('renders with the right css class', () => {
    expect(wrapper.find(`.${styles.page}`)).toHaveLength(1);
  });

  it('renders <Sidebar /> component', () => {
    expect(wrapper.find(Sidebar)).toHaveLength(1);
  });

  it('renders <Header /> component', () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it('renders <Notification /> component', () => {
    expect(wrapper.find(Notification)).toHaveLength(1);
  });

  it('renders <Footer /> component', () => {
    expect(wrapper.find(Footer)).toHaveLength(1);
  });

  it('renders <ConnectedModal /> component', () => {
    expect(wrapper.find(ConnectedModal)).toHaveLength(1);
  });

  it('renders <RightContainer />', () => {
    expect(wrapper.find(RightContainer)).toHaveLength(1);
  });

  it('renders <LinearProgress /> if loading eq true', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find(LinearProgress)).toHaveLength(1);
  });

  describe('<Tint /> rendering', () => {
    it('does not render by default', () => {
      expect(wrapper.find(Tint)).toHaveLength(0);
    });

    it('does not render if window width is bigger than 960px', () => {
      global.innerWidth = 961;
      global.dispatchEvent(new Event('resize'));
      expect(wrapper.props().isResponsiveSidebarOpen).toBeFalsy();
      expect(wrapper.find(Tint)).toHaveLength(0);
    });

    it('renders when the responsive sidebar is open', () => {
      wrapper.setProps({ isResponsiveSidebarOpen: true });
      expect(wrapper.find(Tint)).toHaveLength(1);
    });
  });

  describe('window resize', () => {
    it('has a window resize handler', () => {
      global.dispatchEvent(new Event('resize'));
      expect(handleResizeMock).toHaveBeenCalled();
    });
  });
});

describe('<ConnectedPageLayout />', () => {
  const mockStore = configureStore([thunk]);
  const initialState = {
    isResponsiveSidebarOpen: false,
    venues: [{ name: 'Cozy' }]
  };
  const store = mockStore(initialState);
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ConnectedPageLayout store={store} />);
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('matches initial state', () => {
    expect(store.getState().isResponsiveSidebarOpen).toBe(
      initialState.isResponsiveSidebarOpen
    );
  });
});
