import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Catalog from './Catalog';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
import userEvent from '@testing-library/user-event';

describe("Test Catalog page", () => {
    const onClickTest = () => { }
    test("Adding product to the cart", () => {
        const testData =  [{count: 1, product: {
            url: "https://ir.ozone.ru/s3/multimedia-9/wc1000/6041662989.jpg",
            name: "Arko Men Гель для бритья",
            type: "volume",
            size: "200 мл",
            barcode: "142635463",
            manufacturer: "Arko",
            brand: "Arko Men",
            description: "Arko Men Гель для бритья для чувствительной кожи",
            price: 269,
            filter: ["shaving"]
        }}]
        render(
            <MemoryRouter>
                <Provider store={setupStore()}>
                    <Catalog onClick={onClickTest} />
                </Provider>
            </MemoryRouter>
        )
        expect(localStorage.getItem('card')).toEqual(null);
        fireEvent.click(screen.getAllByTestId('add-btn')[0])
        expect(localStorage.getItem('card')).toEqual(JSON.stringify(testData));
    })
    test("Dropdown by manufacturer", () => {
        render(
            <MemoryRouter>
                <Provider store={setupStore()}>
                    <Catalog onClick={onClickTest} />
                </Provider>
            </MemoryRouter>
        )
        const input = screen.getByTestId('manufacturer_search')
        fireEvent.input(input, {value: "arko"})
        const resultLength = screen.getAllByTestId('dropdown-component_Arko}').length
        expect(resultLength).toBe(1)
    });
    test("Filter by manufacturer", () => {
        render(
            <MemoryRouter>
                <Provider store={setupStore()}>
                    <Catalog onClick={onClickTest} />
                </Provider>
            </MemoryRouter>
        )
        userEvent.click(screen.getAllByTestId('dropdown-checkbox-Arko')[0])
        const show_btn = screen.getByTestId('btn-show')
        userEvent.click(show_btn)
        expect(screen.getAllByTestId('add-btn').length).toBe(1)
    })
})