import React from 'react';
import renderer from 'react-test-renderer';
import Hint from './index';

describe('<Hint />', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(<Hint title="TestTitle" value={{ y: 200 }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
