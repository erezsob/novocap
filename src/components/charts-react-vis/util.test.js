import format from './util';

const data = {
  food: [{ date: 'foo', revenue: 200 }, { date: 'bar', revenue: 999 }],
  drinks: [{ date: 'covfefe', revenue: 666 }]
};

it('formats the data for react-vis charts', () => {
  const expectedData = {
    food: [{ x: 'foo', y: 200 }, { x: 'bar', y: 999 }],
    drinks: [{ x: 'covfefe', y: 666 }]
  };
  expect(format(data)).toEqual(expectedData);
});
