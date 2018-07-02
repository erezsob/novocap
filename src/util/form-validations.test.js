import validate from './form-validations';

describe('username', () => {
  test('not empty', () => {
    expect(validate({ username: '' }).username).toBe(
      'Please enter your username'
    );
  });

  test('not longer than 20 chars', () => {
    expect(validate({ username: 'mysuperlengthydummyusername' }).username).toBe(
      '20 characters or less'
    );
  });
});

describe('password', () => {
  test('not empty', () => {
    expect(validate({ password: '' }).password).toBe(
      'Please enter your password'
    );
  });
});

describe('costs', () => {
  test('not empty', () => {
    expect(validate({ costs: '' }).costs).toBe('Required');
  });

  test('number with more than 12 digits', () => {
    expect(validate({ costs: '123456789101112' }).costs).toBe(
      'You passed the maximum costs allowed'
    );
  });

  test('negative number', () => {
    expect(validate({ costs: '-123' }).costs).toBe(
      'Please enter only positive numbers'
    );
  });
});
