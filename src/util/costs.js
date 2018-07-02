// @flow
import { RANGES } from './../constants';

export function calculateCostsPerTimeFrame(
  monthlyCosts: number,
  timeFrame: string
): number {
  switch (timeFrame) {
    case RANGES.WEEKLY: {
      return monthlyCosts / 4;
    }
    case RANGES.DAILY: {
      return monthlyCosts / 30;
    }
    default: {
      return monthlyCosts;
    }
  }
}
