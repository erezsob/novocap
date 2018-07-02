// @flow
import { LOCAL_STORAGE_VENUE_KEY } from './../constants';
import type { SessionVenue } from './../common/types';

export function getVenueFromStorage(): SessionVenue {
  const emptyVenue: SessionVenue = JSON.stringify({
    id: '-1',
    name: '',
    currencyType: ''
  });

  return JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_VENUE_KEY) || emptyVenue
  );
}
