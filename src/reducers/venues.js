import * as actions from './../common/ActionTypes';

const initialState = [
  {
    address: {
      address1: '',
      address2: '',
      city: '',
      country: '',
      countryCode: '',
      latitude: 0,
      longitude: 0,
      state: '',
      streetNumber: '',
      zipCode: ''
    },
    createdAt: '',
    currencyType: '',
    name: '',
    uuid: ''
  }
];

export default function venue(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_VENUES_SUCCESS: {
      return action.venues;
    }
    default: {
      return state;
    }
  }
}
