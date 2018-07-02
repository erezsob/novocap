import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import NotFoundPage from './';

describe('<NotFoundPage />', () => {
  it('renders properly', () => {
    const tree = renderer
      .create(
        <Router>
          <NotFoundPage />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
