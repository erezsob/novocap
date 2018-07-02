// @flow
import { AXIS } from './../../constants';

import type {
  Revenues,
  RevenueItem,
  RevenuesReactVis
} from '../../common/types';

const parsePoints = (values: RevenueItem) =>
  values.map(v => ({ x: v[AXIS.X], y: v[AXIS.Y] }));

export default function formatDataForReactVis(
  data: Revenues
): RevenuesReactVis {
  let result = {};

  for (const [key, value] of Object.entries(data)) {
    result[`${key}`] = parsePoints(value);
  }
  return result;
}
