import React from 'react';
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import App from '../src/App';

describe('App', () => {

  beforeEach(() => {

  });

    afterEach(() => {

    });


    it('renders without crashing', () => {
      ReactTestUtils.renderIntoDocument(<App />);
    });

    it('renders the author`s link', () => {
      // const rendered = ReactTestUtils.renderIntoDocument(<App />);
      // const link = rendered.find('Hector Longarte')
      render(<App />);
      const linkElement = screen.getByText(/Hector Longarte/i);

      // expect(linkElement.length).toEqual(1);
      expect(linkElement).toBeInTheDocument();
  });


});