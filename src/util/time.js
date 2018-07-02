// @flow
import moment from 'moment';
import {
  CURRENT_TIME_FRAME_FILTERS,
  RANGES,
  REVENUE_TIME_FORMAT
} from '../constants';

export const time = (): string => {
  return `${moment().format('HH:mm')}h`;
};

export const date = (): string => {
  return moment().format('ddd, DD/MM/YYYY');
};

export function getCurrentTimeFrame(timeFrame: string, timeCode?: string = '') {
  const getTime = timeCode ? moment.parseZone(timeCode) : moment();
  const mockCurrentTime = !!localStorage.getItem('mockCurrentTime');

  if (mockCurrentTime) {
    return CURRENT_TIME_FRAME_FILTERS[timeFrame];
  }

  switch (timeFrame) {
    case RANGES.MONTHLY: {
      return {
        startDate: getTime.startOf('month').format(REVENUE_TIME_FORMAT),
        endDate: getTime.endOf('month').format(REVENUE_TIME_FORMAT)
      };
    }
    case RANGES.WEEKLY: {
      return {
        startDate: getTime.startOf('isoWeek').format(REVENUE_TIME_FORMAT),
        endDate: getTime.endOf('isoWeek').format(REVENUE_TIME_FORMAT)
      };
    }
    case RANGES.DAILY: {
      return {
        startDate: getTime.startOf('day').format(REVENUE_TIME_FORMAT),
        endDate: getTime.endOf('day').format(REVENUE_TIME_FORMAT)
      };
    }
    default: {
      return null;
    }
  }
}
