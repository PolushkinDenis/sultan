import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import Header from './components/header/Header';
import { MemoryRouter } from 'react-router-dom';
import Card from './pages/card/Card';
import Catalog from './pages/catalog/Catalog';

describe("Test routing", () => {
  test("Test card link", () => {
    render(
      <Provider store={setupStore()}>
        <App />
      </Provider>
    )
    const cardLink = screen.getByTestId('card-link')
    userEvent.click(cardLink)
    expect(screen.getByTestId('card-page')).toBeInTheDocument()
  });

  test("Test button back in card page", () => {
    render(
      <Provider store={setupStore()}>
        <App />
      </Provider>
    )
    const backLink = screen.getByTestId('back-link')
    userEvent.click(backLink)
    expect(screen.getByTestId('catalog-page')).toBeInTheDocument()
  });

  test("Test productCard link", () => {
    render(
      <Provider store={setupStore()}>
        <App />
      </Provider>
    )
    const productCardLink = screen.getAllByTestId('productCard-link')[0]
    userEvent.click(productCardLink)
    expect(screen.getByTestId('productCard-page')).toBeInTheDocument()
  });

  test("Test button back in productCard page", () => {
    render(
      <Provider store={setupStore()}>
        <App />
      </Provider>
    )
    const backLink = screen.getByTestId('back-link')
    userEvent.click(backLink)
    expect(screen.getByTestId('catalog-page')).toBeInTheDocument()
  });

  test("Test admin link", () => {
    render(
      <Provider store={setupStore()}>
        <App />
      </Provider>
    )
    const productCardLink = screen.getByTestId('admin-link')
    userEvent.click(productCardLink)
    expect(screen.getByTestId('admin-page')).toBeInTheDocument()
  });

  test("Test button back in admin page", () => {
    render(
      <Provider store={setupStore()}>
        <App />
      </Provider>
    )
    const backLink = screen.getByTestId('back-link')
    userEvent.click(backLink)
    expect(screen.getByTestId('catalog-page')).toBeInTheDocument()
  });

});



