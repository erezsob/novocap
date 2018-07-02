import React from 'react';
import { shallow, mount } from 'enzyme';
import { Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Login } from './';
import { LoginForm, Notification } from './../../connected-components';
import { Footer } from './../../components';
import styles from './styles.css';

describe('<Login />', () => {
  const mockCheckIfLoggedIn = jest.fn();
  let wrapper;
  let spyComponentDidMount;
  let spyComponentWillReceiveProps;

  beforeEach(() => {
    spyComponentDidMount = jest.spyOn(Login.prototype, 'componentDidMount');
    spyComponentWillReceiveProps = jest.spyOn(
      Login.prototype,
      'componentWillReceiveProps'
    );

    wrapper = shallow(
      <Login
        location={{ state: { from: '/foo' } }}
        checkIfLoggedIn={mockCheckIfLoggedIn}
      />
    );
  });

  afterEach(() => {
    spyComponentDidMount.mockClear();
    spyComponentWillReceiveProps.mockClear();
    mockCheckIfLoggedIn.mockClear();
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
  });

  describe('Lifecycle methods', () => {
    test('componentDidMount()', () => {
      expect(spyComponentDidMount).toHaveBeenCalledTimes(1);
      expect(mockCheckIfLoggedIn).toHaveBeenCalledTimes(1);
    });

    test('componentWillReceiveProps()', () => {
      expect(spyComponentWillReceiveProps).toHaveBeenCalledTimes(0);
      wrapper.setProps({ isAuthenticated: true });
      wrapper.update();
      expect(spyComponentWillReceiveProps).toHaveBeenCalledTimes(1);
    });
  });

  describe('authenticated user', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <Login
          location={{ state: { from: '/dummy-path' } }}
          checkIfLoggedIn={mockCheckIfLoggedIn}
          isAuthenticated={true}
        />
      );
    });

    it('renders <Redirect />', () => {
      expect(wrapper.find(Redirect)).toHaveLength(1);
    });

    it('redirects to the right URL', () => {
      expect(wrapper.find(Redirect).props('to')).toEqual({
        push: false,
        to: '/dummy-path'
      });
    });
  });

  describe('NOT authenticated user', () => {
    const notification = {
      isActive: false,
      message: '',
      type: ''
    };
    const mockStore = configureStore([thunk]);
    let store = mockStore({ notification });
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <Login
            location={{ state: { from: '/' } }}
            checkIfLoggedIn={mockCheckIfLoggedIn}
            isAuthenticated={false}
          />
        </Provider>
      );
    });

    it('renders a `loginBox`', () => {
      expect(wrapper.find(`.${styles.loginBox}`)).toHaveLength(1);
    });

    it('renders a <Notification />', () => {
      expect(wrapper.find(Notification)).toHaveLength(1);
    });

    it('renders a <LoginForm />', () => {
      expect(wrapper.find(LoginForm)).toHaveLength(1);
    });

    it('renders <Footer />', () => {
      expect(wrapper.find(Footer)).toHaveLength(1);
    });
  });
});
