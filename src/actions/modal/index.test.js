import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { showModal, hideModal } from './';
import * as types from '../../common/ActionTypes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store;

beforeEach(() => {
  store = mockStore();
});

describe('Test Modal Actions', () => {
  test('showModal() --> open the modal', () => {
    const state = {
      title: 'BREAK EVEN',
      content:
        'Please enter your monthly costs to keep track of your point break even',
      input: {
        label: 'Monthly costs'
      }
    };
    store.dispatch(showModal(state));
    const actions = store.getActions();
    const expectedPayload = {
      type: types.SHOW_MODAL,
      open: true,
      modalConfig: {
        title: 'BREAK EVEN',
        content:
          'Please enter your monthly costs to keep track of your point break even',
        input: {
          label: 'Monthly costs'
        }
      }
    };
    expect(actions[0]).toEqual(expectedPayload);
  });
  test('hideModal() --> hides the modal', () => {
    store.dispatch(hideModal());
    const actions = store.getActions();
    const expectedPayload = {
      type: types.HIDE_MODAL,
      open: false
    };
    expect(actions[0]).toEqual(expectedPayload);
  });
});
