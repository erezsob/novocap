import { formatCurrency } from './format';
import { formatDate } from './format';
import { RANGES } from '../constants';

test('should invoke localString implementation to format currency ', () => {
  const localStringMock = jest.fn();
  const mockNumber = { toLocaleString: localStringMock };
  formatCurrency(mockNumber);
  expect(localStringMock).toHaveBeenCalledWith('de-DE', {
    currency: 'EUR',
    style: 'currency'
  });
});

test('returns the right format for the X Axis', () => {
  expect(formatDate('2017-01-01', RANGES.MONTHLY)).toBe('January-17');
  expect(formatDate('2017-03-13', RANGES.DAILY)).toBe('Monday');
  expect(formatDate('2017-05-09', RANGES.WEEKLY)).toBe('Week 19-17');
});
