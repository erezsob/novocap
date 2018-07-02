import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  getCostsFromLocalStorage,
  setMonthlyCosts,
  setCostsPerTimeFrame,
  saveCostsFromModal,
  saveCostsToLocalStorage
} from './';
import * as actionTypes from './../../common/ActionTypes';
import { RANGES } from './../../constants';
import { LOCAL_STORAGE_COSTS_KEY } from '../../constants';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store;

beforeEach(() => {
  store = mockStore();
});

describe('Costs actions', () => {
  test('set monthly costs', () => {
    store = mockStore(0);
    store.dispatch(setMonthlyCosts(3000));
    const actions = store.getActions();
    const expectedPayload = {
      type: actionTypes.SET_MONTHLY_COSTS,
      costs: 3000
    };
    expect(actions[0]).toEqual(expectedPayload);
  });

  test('set costs to LocalStorage', () => {
    const testCosts = 17746;
    store.dispatch(saveCostsToLocalStorage(testCosts));
    const actions = store.getActions();
    const dataFromLocalStorage = parseInt(
      localStorage.getItem(LOCAL_STORAGE_COSTS_KEY)
    );
    const expectedPayload = {
      type: actionTypes.SET_MONTHLY_COSTS,
      costs: 17746
    };

    expect(actions[0]).toEqual(expectedPayload);
    expect(dataFromLocalStorage).toEqual(testCosts);
  });

  test('get costs from LocalStorage', () => {
    localStorage.setItem('costs', 3456);
    store.dispatch(getCostsFromLocalStorage(LOCAL_STORAGE_COSTS_KEY));
    const actions = store.getActions();
    const expectedPayload = {
      type: actionTypes.SET_MONTHLY_COSTS,
      costs: 3456
    };
    expect(actions[0]).toEqual(expectedPayload);
  });

  test('set costs per time frame', () => {
    store = mockStore({ monthlyCosts: 1000, timeFrameBreakEven: RANGES.DAILY });
    store.dispatch(setCostsPerTimeFrame());
    const actions = store.getActions();
    const expectedPayload = {
      type: actionTypes.SET_COSTS_PER_TIME_FRAME,
      costs: 33
    };
    expect(actions[0]).toEqual(expectedPayload);
  });

  test('save costs from modal', () => {
    const initialState = {
      revenueBreakEven: 17000,
      modal: { open: true }
    };
    const form = {
      costs: 23000
    };
    store = mockStore(initialState);
    store.dispatch(saveCostsFromModal(form));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: actionTypes.HIDE_MODAL,
      open: false
    });
    expect(actions[1]).toEqual({
      type: actionTypes.SET_MONTHLY_COSTS,
      costs: 23000
    });
  });
});
