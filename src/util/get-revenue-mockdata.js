// @flow
import { RANGES } from '../constants';
import data_yearly from '../../mockdata/revenue_monthly.json';
import data_monthly from '../../mockdata/revenue_daily.json';
import data_weekly from '../../mockdata/revenue_weekly.json';

import type { RawRevenue } from './../common/types';

export default function(selected: string): RawRevenue {
  switch (selected) {
    case RANGES.WEEKLY: {
      return data_weekly;
    }
    case RANGES.DAILY: {
      return data_monthly;
    }
    case RANGES.MONTHLY: {
      return data_yearly;
    }
    default: {
      return null;
    }
  }
}
