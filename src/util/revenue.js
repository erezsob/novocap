// @flow
import { SUPER_CATEGORIES } from './../constants';

import type { RawRevenue, Revenues, RevenueItem } from './../common/types';

export const getRevenuesArrayBySuperCategoryKey = (
  familyGroups: RawRevenue,
  key: string
): Array<RevenueItem> => {
  const found = familyGroups.find(item => item.superCategory === key);
  return found.revenues;
};

export const calculateFamilyGroupTotal = (
  familyGroupArray: Array<RevenueItem>
): number => familyGroupArray.reduce((acc, entry) => acc + entry.revenue, 0);

export const calculateRevenueAllFamilyGroups = (familyGroups: RawRevenue) => ({
  food: calculateFamilyGroupTotal(familyGroups.food),
  drinks: calculateFamilyGroupTotal(familyGroups.drinks),
  other: calculateFamilyGroupTotal(familyGroups.other)
});

export const flattenRevenue = (familyGroups: RawRevenue): Revenues => ({
  food: getRevenuesArrayBySuperCategoryKey(familyGroups, SUPER_CATEGORIES.FOOD),
  drinks: getRevenuesArrayBySuperCategoryKey(
    familyGroups,
    SUPER_CATEGORIES.DRINKS
  ),
  other: getRevenuesArrayBySuperCategoryKey(
    familyGroups,
    SUPER_CATEGORIES.OTHER
  )
});
