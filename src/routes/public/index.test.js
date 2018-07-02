import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import { MemoryRouter } from 'react-router-dom';
import MembersRouter from './../members';
import { Login, NotFoundPage } from './../../pages';
import { LOG_IN, ROOT, MEMBERS } from './../../routes';
import PublicRouter from './';

const notification = {
  isActive: false,
  message: '',
  type: ''
};
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({ notification });

describe('<PublicRouter />', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  test('Invalid path should redirect to 404 page', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/asdf']}>
          <PublicRouter />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(NotFoundPage)).toHaveLength(1);
  });

  test(`${LOG_IN} route redirects to login page`, () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[LOG_IN]}>
          <PublicRouter />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(Login)).toHaveLength(1);
  });

  test(`${ROOT} route redirects to login page if not loggedIn`, () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ROOT]}>
          <PublicRouter />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(Login)).toHaveLength(1);
  });

  describe('Members area', () => {
    const store = mockStore({
      isAuthenticated: true,
      revenueDataDashboard: { food: [], drinks: [], other: [] },
      revenueDataBreakEven: { food: [], drinks: [], other: [] },
      venues: [{ name: 'Cozy' }],
      modal: {
        open: false,
        modalConfig: { title: '', content: '', input: {}, ctas: [] }
      },
      notification
    });

    test(`${ROOT} route redirects to members area page`, () => {
      fetchMock.mock('*', {});
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[ROOT]}>
            <PublicRouter />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(MembersRouter)).toHaveLength(1);
    });

    test(`${MEMBERS} route redirects to members area page`, () => {
      fetchMock.mock('*', {});
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[MEMBERS]}>
            <PublicRouter />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(MembersRouter)).toHaveLength(1);
    });
  });
});
