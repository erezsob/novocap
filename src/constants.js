// @flow
import type { LanguageLink } from './common/types';

export const GOOGLE_MAPS_API_KEY = 'AIzaSyDQeH2cmhTOd435kRLbKO0iqpSOssScAi0';
export const CHART_HEIGHT = 250;
export const WIDGETS_CONTAINER_ID = 'widgetsContainer';
export const BREAK_EVEN_RANGES_TITLES = {
  daily: 'Today',
  monthly: 'This month',
  weekly: 'This week'
};
export const RANGES = {
  WEEKLY: 'weekly',
  DAILY: 'daily',
  MONTHLY: 'monthly'
};
export const SUPER_CATEGORIES = {
  FOOD: 'food',
  DRINKS: 'drinks',
  OTHER: 'other'
};
export const AXIS = {
  X: 'date',
  Y: 'revenue'
};
export const SERIES_CONFIG = {
  food: {
    id: 'food',
    color: '#E51743',
    title: 'Food'
  },
  drinks: {
    id: 'drinks',
    color: '#00A3E0',
    title: 'Drinks'
  },
  other: {
    id: 'other',
    color: '#FFD968',
    title: 'Other'
  }
};
export const LOCAL_STORAGE_COSTS_KEY = 'costs';
export const LOCAL_STORAGE_JWT_TOKEN_KEY = 'jwt_token';
export const LOCAL_STORAGE_VENUE_KEY = 'venue';
// TODO FAL-203 hard-coded dates till we have a proper date picker
export const REVENUE_FILTERS = {
  monthly: {
    startDate: '2017-01-01',
    endDate: '2017-07-31'
  },
  weekly: {
    startDate: '2017-01-02',
    endDate: '2017-01-22'
  },
  daily: {
    startDate: '2017-01-01',
    endDate: '2017-01-20'
  }
};
// TODO: hardcoded dates until the backend can handle real current time
export const CURRENT_TIME_FRAME_FILTERS = {
  monthly: {
    startDate: '2017-01-01',
    endDate: '2017-07-31'
  },
  weekly: {
    startDate: '2017-01-02',
    endDate: '2017-01-08'
  },
  daily: {
    startDate: '2017-01-02',
    endDate: '2017-01-02'
  }
};
export const ITEMS_PER_PAGE = [20, 50, 75, 100];
export const DEFAULT_PAGER_SIZE = 6;
export const FORMS = {
  LOGIN: 'login',
  COSTS: 'costs'
};
export const LANGUAGES: Array<LanguageLink> = [
  { to: '', text: 'English', code: 'en' },
  { to: '', text: 'Deutsch', code: 'de' },
  { to: '', text: 'Français', code: 'fr' }
];
export const REVENUE_TIME_FORMAT = 'YYYY-MM-DD';
export const NOTIFICATION = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING'
};
