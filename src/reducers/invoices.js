import { FETCH_INVOICES_SUCCESS } from '../common/ActionTypes';

const initialState = {
  page: 1,
  size: 20,
  totalElements: undefined,
  totalPages: undefined,
  elements: [
    {
      uuid: '',
      createdAt: '',
      closedAt: '',
      totalAmount: '',
      invoiceNumber: '',
      table: {
        name: '',
        oid: {
          uuid: '',
          version: undefined
        }
      },
      user: {
        name: '',
        oid: {
          uuid: '',
          version: undefined
        }
      },
      paymentTypes: {
        name: '',
        oid: {
          uuid: '',
          version: undefined
        }
      }
    }
  ]
};

export default function invoices(state = initialState, action) {
  switch (action.type) {
    case FETCH_INVOICES_SUCCESS: {
      return { ...state, ...action.invoices };
    }
    default: {
      return state;
    }
  }
}
