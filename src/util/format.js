// @flow
import moment from 'moment';
import { RANGES } from './../constants';

export function formatCurrency(
  number: number,
  withFractionDigits: boolean = true
): string {
  const noFractionDigits = {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  };
  const defaultOptions = { style: 'currency', currency: 'EUR' };
  const options = withFractionDigits
    ? defaultOptions
    : { ...defaultOptions, ...noFractionDigits };

  return number ? number.toLocaleString('de-DE', options) : `${number}`;
}

export const formatDate = (value: string, timeRange: string): string => {
  switch (timeRange) {
    case RANGES.MONTHLY: {
      return moment(value).format('MMMM-YY');
    }
    case RANGES.DAILY: {
      return moment(value).format('dddd');
    }
    case RANGES.WEEKLY: {
      return `Week ${moment(value).format('W-YY')}`;
    }
    default: {
      return value;
    }
  }
};
