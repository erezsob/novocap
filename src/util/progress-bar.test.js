import { generateData } from './progress-bar';

describe('generateData() -> generates chart data based on the percent and styles', () => {
  let styles;

  beforeEach(() => {
    styles = {
      successBar: 'successBar',
      progressBar: 'progressBar',
      staticBar: 'staticBar'
    };
  });

  test('below 100', () => {
    const percent = 35;

    const chartData = generateData(percent, styles);
    const expectedData = [
      {
        theta: 0,
        className: 'successBar'
      },
      {
        theta: 35,
        className: 'progressBar'
      },
      {
        theta: 65,
        className: 'staticBar'
      }
    ];

    expect(chartData).toEqual(expectedData);
  });

  test('above 100', () => {
    const percent = 108;

    const chartData = generateData(percent, styles);
    const expected = [
      {
        theta: 100,
        className: 'successBar'
      },
      {
        theta: 0,
        className: 'progressBar'
      },
      {
        theta: 0,
        className: 'staticBar'
      }
    ];

    expect(chartData).toEqual(expected);
  });
});
