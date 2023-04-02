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
    // products: Product[],
    onClick: React.MouseEventHandler
}

const CatalogList: FC<CatalogListProps> = ({ onClick }) => {
    const [productsRedux, setProductsRedux] = useState<Product[]>([])
    const { products, filteredProducts, filteredByType, finalSorting, type, sort } = useAppSelector(state => state.filterReducer)
    const [filteredProductsRed, setFilteredProductsRed] = useState(filteredProducts)

    const [productPagination, setProductPagination] = useState<Product[]>([])
    const [countOfPage, setCountOfPage] = useState<number>(0)

    const [pages, setPages] = useState<number[]>([])
    const [activePage, setActivePage] = useState(1)

    const dispatch = useDispatch()

    console.log(filteredProducts)

    const paginate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const start = (Number(e.currentTarget.id) - 1) * 15
        const end = Number(e.currentTarget.id) * 15
        console.log("paginate")
        const sortedProduct = sorting(finalSorting)
        setProductPagination(sortedProduct.slice(start, end))
        
        //setProductPagination(finalSorting.slice(start, end))
        setActivePage(Number(e.currentTarget.id))
        window.scrollTo(0, 100);
    }

    const paginatePrevPage = () => {
        if (activePage > 1) {
            const start = ((activePage - 1) - 1) * 15
            const end = (activePage - 1) * 15
            console.log("paginate")
            //setProductPagination(finalSorting.slice(start, end))
            
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
            console.log("paginate")
            const sortedProduct = sorting(finalSorting)
            setProductPagination(sortedProduct.slice(start, end))
            
            setProductPagination(finalSorting.slice(start, end))
            setActivePage(activePage + 1)
            window.scrollTo(0, 100);
        }
    }

    const sorting = (productForSort: Product[]) => {
        console.log(sort)
        let productSort: Product[] = [...productForSort]
        let sorted: Product[] = []
        if (sort === "name-dec") {
            sorted = productSort.sort(sortByAlphabetically)
        }
        else if (sort === "name-inc") {
            sorted = productSort.sort(sortNotByAlphabetically)
            console.log(sorted)
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
        // console.log(filteredByType.products)
        // console.log(filteredProducts.products)
        console.log("USEEFFECT CATALOGLIST")
        //Сортировка по обоим фильтрам
        if (filteredByType.active === true && filteredProducts.active === true) {
            console.log("by two")
            // console.log(filteredByType.products)
            // console.log(filteredProducts.products)
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

            //setProductPagination(sortedProduct.slice(start, end))
            //dispatch(filtersSlice.actions.addFinalFiltered(newFilteredProducts))
        }
        // Сортировка по тиру
        else if (filteredByType.active === true) {
            console.log('by type')
            const sortedProduct = sorting(filteredByType.products)
            setActivePage(1)
            dispatch(filtersSlice.actions.addFinalFiltered(sortedProduct))
            //dispatch(filtersSlice.actions.addFinalFiltered(filteredByType.products))
        }
        // Сортировка по основным фильтрам
        else if (filteredProducts.active === true) {
            console.log('by main')
            const sortedProduct = sorting(filteredProducts.products)
            setActivePage(1)
            dispatch(filtersSlice.actions.addFinalFiltered(sortedProduct))
            //dispatch(filtersSlice.actions.addFinalFiltered(filteredProducts.products))
        }

    }, [filteredProducts, filteredByType, products, sort])

    useEffect(() => {
        console.log("StaRT")
        const pagesCount = Math.ceil(finalSorting.length / 15)
        let pagesArr: number[] = []
        for (let i = 1; i <= pagesCount; i++) {
            pagesArr.push(i)
        }
        setPages(pagesArr)
        setActivePage(1)
        const sortedProduct = sorting(finalSorting)
        console.log(sortedProduct)
        setProductPagination(sortedProduct.slice(0, 15))

        //setProductPagination(finalSorting.slice(0, 15))
    }, [finalSorting, sort])

    // useEffect(() => {
    //     console.log(manufacturer)
    //     const filteredProducts: Product[] = []
    //     if(manufacturer !== null && manufacturer.length > 0) {
    //         manufacturer?.map((manufactur) => {
    //             products.map(product => {
    //                 console.log(manufactur)
    //                 if(manufactur.name === product.manufacturer && manufactur.check === true) {
    //                     console.log('Asd')
    //                     filteredProducts.push(product)
    //                 }
    //             })
    //         })
    //         setProductsRedux(filteredProducts)
    //     }
    //     else {
    //         setProductsRedux(products)
    //     }

    // }, [manufacturer])

    console.log(finalSorting)

    return (
        <div className="catalog_list">
            <div className="catalogList">
                {productPagination.map((product) => (
                    <CatalogItem product={product} onClick={onClick} key={product.name} />
                ))}
            </div>

            <div className="catalogList__page">
                <button className="prev__pagination pagination" onClick={paginatePrevPage}><img src={arrow_prev_pagination} /></button>
                {pages.map((page) => (
                    <button disabled={activePage == page ? true : false} className={activePage == page ? 'pagination-btn page__active' : 'pagination-btn page'} id={page.toString()} onClick={e => paginate(e)} key={page}>{page}</button>
                ))}
                <button className="next__pagination pagination" onClick={paginateNextPage}><img src={arrow_next_pagination} /></button>

            </div>
        </div>
    )
}

export default CatalogList