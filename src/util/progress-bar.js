// @flow
export const generateData = (
  percent: number,
  styles: Object
): Array<Object> => [
  {
    theta: percent >= 100 ? 100 : 0,
    className: styles.successBar
  },
  {
    theta: percent < 100 ? percent : 0,
    className: styles.progressBar
  },
  {
    theta: percent < 100 ? 100 - percent : 0,
    className: styles.staticBar
  }
];
