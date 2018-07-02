import { calculateCostsPerTimeFrame } from './costs';
import { RANGES } from './../constants';

describe('correctly calculates the costs per time frame', () => {
  const monthlyCosts = 100;

  test('costs per day', () => {
    expect(calculateCostsPerTimeFrame(monthlyCosts, RANGES.DAILY)).toBe(
      monthlyCosts / 30
    );
  });

  test('costs per week', () => {
    expect(calculateCostsPerTimeFrame(monthlyCosts, RANGES.WEEKLY)).toBe(
      monthlyCosts / 4
    );
  });

  test('costs per month', () => {
    expect(calculateCostsPerTimeFrame(monthlyCosts, RANGES.MONTH)).toBe(
      monthlyCosts
    );
  });
});
