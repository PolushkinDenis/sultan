import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
import Card from './Card';
import { MemoryRouter } from 'react-router-dom';

describe("Test Card page", () => {
    const onClickTest = () => { }
    test("Сorrect rendering of the component", () => {
        const testData =  [{count: 1, product: {
            url: "https://basket-03.wb.ru/vol370/part37026/37026874/images/c246x328/1.jpg",
            name: "Молочко для тела с мерцающим эффектом",
            type: "volume",
            size: "236 мл",
            barcode: "4604049097548",
            manufacturer: "Victoria's Secret",
            brand: "Victoria's Secret",
            description: "Молочко для тела с мерцающим эффектом `Coconut Passion`, 236 мл",
            price: 1000,
            filter: ["body"]
        }}]
        window.localStorage.setItem('card', JSON.stringify(testData));

        render(
            <MemoryRouter>
                <Card onClick={onClickTest} />
            </MemoryRouter>
        )

        expect(screen.getByText('-')).toBeInTheDocument()
        expect(screen.getByText('+')).toBeInTheDocument()
        expect(screen.getByTestId('count-product')).toContainHTML("1")
    });
    test("Increase and decrease the number of products", () => {
        render(
            <MemoryRouter>
                <Card onClick={onClickTest} />
            </MemoryRouter>
        )
        fireEvent.click(screen.getByText('+'))
        expect(screen.getByTestId('count-product')).toContainHTML("2")
        fireEvent.click(screen.getByText('-'))
        expect(screen.getByTestId('count-product')).toContainHTML("1")
    });
    test("Delete product", () => {
        render(
            <MemoryRouter>
                <Card onClick={onClickTest} />
            </MemoryRouter>
        )
        fireEvent.click(screen.getByTestId('delete-btn'))
        expect(localStorage.getItem('card')).toEqual(JSON.stringify([]));
    })
})