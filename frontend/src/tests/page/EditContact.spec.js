import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { EditContact } from '../../pages/EditContact';

describe('<EditContact />', () => {
  it('should render edit contacts page', () => {
    const { container } = render(
      <Router>
        <EditContact />
      </Router>,
    );
    expect(container).toMatchSnapshot();
  });
});
