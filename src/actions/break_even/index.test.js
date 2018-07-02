import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { calculateBreakEven } from './';
import * as actionTypes from './../../common/ActionTypes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Test Break Even Actions', () => {
  test('calculateBreakEven', () => {
    const initialState = {
      costsPerTimeFrame: 13000,
      revenueBreakEven: {
        food: 9000,
        drinks: 400,
        other: 90
      }
    };
    const store = mockStore(initialState);
    store.dispatch(calculateBreakEven());
    const actions = store.getActions();
    const expectedPayload = {
      type: actionTypes.SET_BREAK_EVEN,
      percent: 73
    };
    expect(actions[0]).toEqual({ type: actionTypes.CALCULATE_BREAK_EVEN });
    expect(actions[1]).toEqual(expectedPayload);
  });
});
