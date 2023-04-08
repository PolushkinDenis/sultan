import React, { FC, useEffect, useState } from "react";
import './CatalogList.scss'
import { Product } from "../../types/product";
import CatalogItem from "./catalogItem/CatalogItem";
import { useAppSelector } from "../../hooks/redux";
import { useDispatch } from "react-redux";
import { filtersSlice } from "../../store/reducers/filtersSlice";
import arrow_prev_pagination from '../../images/arrow_prev_pagination.png'
import arrow_next_pagination from '../../images/arrow_next_pagination.png'


interface CatalogListProps {
    onClick: React.MouseEventHandler
}

const CatalogList: FC<CatalogListProps> = ({ onClick }) => {
    const { products, filteredProducts, filteredByType, finalSorting, sort } = useAppSelector(state => state.filterReducer)
    const [productPagination, setProductPagination] = useState<Product[]>([])
    const [pages, setPages] = useState<number[]>([])
    const [activePage, setActivePage] = useState(1)

    const dispatch = useDispatch()

    const paginate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const start = (Number(e.currentTarget.id) - 1) * 15
        const end = Number(e.currentTarget.id) * 15
        const sortedProduct = sorting(finalSorting)
        setProductPagination(sortedProduct.slice(start, end))
        setActivePage(Number(e.currentTarget.id))
        window.scrollTo(0, 100);
    }

    const paginatePrevPage = () => {
        if (activePage > 1) {
            const start = ((activePage - 1) - 1) * 15
            const end = (activePage - 1) * 15
            const sortedProduct = sorting(finalSorting)
            setProductPagination(sortedProduct.slice(start, end))
            setActivePage(activePage - 1)
            window.scrollTo(0, 100);
        }
    }
    const paginateNextPage = () => {
        if (activePage < pages.length) {
            const start = ((activePage + 1) - 1) * 15
            const end = (activePage + 1) * 15
            const sortedProduct = sorting(finalSorting)
            setProductPagination(sortedProduct.slice(start, end))
            setProductPagination(finalSorting.slice(start, end))
            setActivePage(activePage + 1)
            window.scrollTo(0, 100);
        }
    }

    const sorting = (productForSort: Product[]) => {
        let productSort: Product[] = [...productForSort]
        let sorted: Product[] = []
        if (sort === "name-dec") {
            sorted = productSort.sort(sortByAlphabetically)
        }
        else if (sort === "name-inc") {
            sorted = productSort.sort(sortNotByAlphabetically)
        }
        else if (sort === "price-dec") {
            sorted = productSort.sort(sortByIncPrice)
        }
        else if (sort === "price-inc") {
            sorted = productSort.sort(sortByDecPrice)
        }
        return sorted
    }

    const sortByAlphabetically = (first: Product, second: Product) => {
        if (first.name < second.name) { return -1; }
        if (first.name > second.name) { return 1; }
        return 0;
    }
    const sortNotByAlphabetically = (first: Product, second: Product) => {
        if (first.name > second.name) { return -1; }
        if (first.name < second.name) { return 1; }
        return 0;
    }
    const sortByIncPrice = (first: Product, second: Product) => {
        if (first.price > second.price) { return -1; }
        if (first.price < second.price) { return 1; }
        return 0;
    }
    const sortByDecPrice = (first: Product, second: Product) => {
        if (first.price < second.price) { return -1; }
        if (first.price > second.price) { return 1; }
        return 0;
    }

    useEffect(() => {
        //Сортировка по обоим фильтрам
        if (filteredByType.active === true && filteredProducts.active === true) {
            const newFilteredProducts: Product[] = []
            filteredProducts.products.map(prod => {
                filteredByType.products.map(prodType => {
                    if (prod.barcode === prodType.barcode) {
                        newFilteredProducts.push(prod)
                    }
                })
            })
            const sortedProduct = sorting(newFilteredProducts)
            setActivePage(1)
            dispatch(filtersSlice.actions.addFinalFiltered(sortedProduct))
        }
        // Сортировка по тиру
        else if (filteredByType.active === true) {
            const sortedProduct = sorting(filteredByType.products)
            setActivePage(1)
            dispatch(filtersSlice.actions.addFinalFiltered(sortedProduct))
        }
        // Сортировка по основным фильтрам
        else if (filteredProducts.active === true) {
            const sortedProduct = sorting(filteredProducts.products)
            setActivePage(1)
            dispatch(filtersSlice.actions.addFinalFiltered(sortedProduct))
        }

    }, [filteredProducts, filteredByType, products, sort])

    useEffect(() => {
        const pagesCount = Math.ceil(finalSorting.length / 15)
        let pagesArr: number[] = []
        for (let i = 1; i <= pagesCount; i++) {
            pagesArr.push(i)
        }
        setPages(pagesArr)
        setActivePage(1)
        const sortedProduct = sorting(finalSorting)
        setProductPagination(sortedProduct.slice(0, 15))
    }, [finalSorting, sort])

    return (
        <div className="catalog_list-main">
            <div className="catalogList">
                {productPagination.map((product) => (
                    <CatalogItem product={product} onClick={onClick} key={product.name} />
                ))}
            </div>
            <div className="catalogList__page">
                {productPagination.length > 0 && (
                    <button className="prev__pagination pagination" onClick={paginatePrevPage}><img src={arrow_prev_pagination} /></button>
                )}
                {pages.map((page) => (
                    <button disabled={activePage == page ? true : false} className={activePage == page ? 'pagination-btn page__active' : 'pagination-btn page'} id={page.toString()} onClick={e => paginate(e)} key={page}>{page}</button>
                ))}
                {productPagination.length > 0 &&
                    <button className="next__pagination pagination" onClick={paginateNextPage}><img src={arrow_next_pagination} /></button>
                }
            </div>
        </div>
    )
}

export default CatalogList