import {
  calculateRevenueAllFamilyGroups,
  calculateFamilyGroupTotal
} from './revenue';

const data = {
  drinks: [
    {
      date: '1',
      revenue: 3
    },
    {
      date: '2',
      revenue: 9
    }
  ],
  food: [
    {
      date: '1',
      revenue: 4
    },
    {
      date: '2',
      revenue: 8
    }
  ],
  other: [
    {
      date: '1',
      revenue: 5
    },
    {
      date: '2',
      revenue: 7
    }
  ]
};

describe('util/revenue.js', () => {
  test('calculates calculateRevenueAllFamilyGroups correctly', () => {
    const actual = calculateRevenueAllFamilyGroups(data);
    const expected = {
      food: 12,
      drinks: 12,
      other: 12
    };

    expect(actual).toEqual(expected);
  });

  test('parse and sum correctly', () => {
    const actual = calculateFamilyGroupTotal(data.food);
    const expected = 12;

    expect(actual).toEqual(expected);
  });
});
