import { time, date, getCurrentTimeFrame } from './time';
import { CURRENT_TIME_FRAME_FILTERS, RANGES } from '../constants';

const mockTime = '2017-05-30T23:44:30Z';

describe('Time function tests', () => {
  test('returns time in format hh:mm', () => {
    const regexTime = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]h$/;
    expect(time().match(regexTime)).toBeTruthy();
  });
});

describe('Date function tests', () => {
  test("returns a date in the format 'Day, dd/mm/yyyy'", () => {
    const regexDate = /^\w{3}, (0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    expect(date().match(regexDate)).toBeTruthy();
  });
});

describe('getCurrentTimeFrame', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  test('gets mockdata', () => {
    localStorage.setItem('mockCurrentTime', 'sure');
    const actualTimeFrame = getCurrentTimeFrame(RANGES.WEEKLY);
    const expectedTimeFrame = CURRENT_TIME_FRAME_FILTERS.weekly;
    expect(actualTimeFrame).toEqual(expectedTimeFrame);
  });

  test('monthly', () => {
    const actualTimeFrame = getCurrentTimeFrame(RANGES.MONTHLY, mockTime);
    const expectedTimeFrame = {
      startDate: '2017-05-01',
      endDate: '2017-05-31'
    };
    expect(actualTimeFrame).toEqual(expectedTimeFrame);
  });

  test('weekly', () => {
    const actualTimeFrame = getCurrentTimeFrame(RANGES.WEEKLY, mockTime);
    const expectedTimeFrame = {
      startDate: '2017-05-29',
      endDate: '2017-06-04'
    };
    expect(actualTimeFrame).toEqual(expectedTimeFrame);
  });

  test('daily', () => {
    const actualTimeFrame = getCurrentTimeFrame(RANGES.DAILY, mockTime);
    const expectedTimeFrame = {
      startDate: '2017-05-30',
      endDate: '2017-05-30'
    };
    expect(actualTimeFrame).toEqual(expectedTimeFrame);
  });
});
