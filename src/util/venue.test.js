import { getVenueFromStorage } from './venue';

test('getVenueFromStorage()', () => {
  expect(getVenueFromStorage()).toEqual({
    id: '-1',
    name: '',
    currencyType: ''
  });
});
