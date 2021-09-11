import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Home } from '../../pages/Home';

describe('<Home />', () => {
  it('should render home page', () => {
    const { container } = render(
      <Router>
        <Home />
      </Router>,
    );
    expect(container).toMatchSnapshot();
  });
});
