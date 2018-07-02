import getMockData from './get-revenue-mockdata';
import { RANGES } from './../constants';
import data_monthly from '../../mockdata/revenue_monthly.json';
import data_daily from '../../mockdata/revenue_daily.json';
import data_weekly from '../../mockdata/revenue_weekly.json';

test('gets the right mock data', () => {
  expect(getMockData(RANGES.DAILY)).toBe(data_daily);
  expect(getMockData(RANGES.MONTHLY)).toBe(data_monthly);
  expect(getMockData(RANGES.WEEKLY)).toBe(data_weekly);
  expect(getMockData('asdf')).toBe(null);
});
