import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { NewContact } from '../../pages/NewContact';

describe('<NewContact />', () => {
  it('should render new contacts page', () => {
    const { container } = render(
      <Router>
        <NewContact />
      </Router>,
    );
    expect(container).toMatchSnapshot();
  });
});
