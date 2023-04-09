import { fireEvent, render, screen } from '@testing-library/react';
import Admin from './Admin';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { products } from '../../data/products';

describe("Test Admin page", () => {
    test("Starting state ", () => {
        render(
            <MemoryRouter>
                <Admin />
            </MemoryRouter>
        )
        expect(localStorage.getItem('products')).toEqual(null);
        expect(screen.getByTestId('add_JSON')).toBeInTheDocument()
        expect(screen.getByTestId('add_new-product')).toBeInTheDocument()
    });
    test("Add product from JSON", () => {
        render(
            <MemoryRouter>
                <Admin />
            </MemoryRouter>
        )  
        userEvent.click(screen.getByTestId('add_JSON'))
        expect(localStorage.getItem('products')).toEqual(JSON.stringify(products));
        localStorage.setItem('products', JSON.stringify([]));
    });
    test("Error if add empty product", () => {
        render(
            <MemoryRouter>
                <Admin />
            </MemoryRouter>
        )  
        userEvent.click(screen.getByTestId('add_new-product'))
        userEvent.click(screen.getByTestId('add-new-product'))
        expect(screen.getByTestId('error')).toHaveTextContent("Заполните все поля")
    });
    test("Add new product", () => {
        const expectData =  [{
            barcode: "1234",
            brand: "Тест",
            description: "Тест",
            filter: ["body"],
            manufacturer: "Тест",
            name: "Тест",
            price: 100,
            size: "Тест",
            type: "weight",
            url: "Тест",
        }]
        render(
            <MemoryRouter>
                <Admin />
            </MemoryRouter>
        )
        userEvent.click(screen.getByTestId('add_new-product'))
        const size = screen.getByTestId('size')
        fireEvent.input(size, {target: {value: "Тест"}})
        fireEvent.input(screen.getByPlaceholderText('Название'), {target: {value: "Тест"}})
        fireEvent.input(screen.getByPlaceholderText('Штрихкод'), {target: {value: 1234}})
        fireEvent.input(screen.getByPlaceholderText('Производитель'), {target: {value: "Тест"}})
        fireEvent.input(screen.getByPlaceholderText('Бренд'), {target: {value: "Тест"}})
        fireEvent.input(screen.getByPlaceholderText('Описание'), {target: {value: "Тест"}})
        fireEvent.input(screen.getByPlaceholderText('Цена'), {target: {value: "100"}})
        fireEvent.input(screen.getByPlaceholderText('Url'), {target: {value: "Тест"}})
        userEvent.click(screen.getByTestId('checkbox_body'))
        userEvent.click(screen.getByTestId('add-new-product'))
        expect(localStorage.getItem('products')).toEqual(JSON.stringify(expectData));
    })
   
})