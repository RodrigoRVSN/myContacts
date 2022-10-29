import React from 'react'
import { render, screen } from '@testing-library/react'
import SearchNotFound from '.'

describe('<SearchNotFound />', () => {
  it('should render the component', () => {
    render(<SearchNotFound />)

    expect(screen.getByTestId("search-not-found")).toBeInTheDocument()
  })
})
  