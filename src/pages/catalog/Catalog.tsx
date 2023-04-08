import React, { FC, useEffect, useState } from "react";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import './Catalog.scss'
import arrow_end from '../../images/arrow__end.png'
import Filters from "../../components/filters/Filters";
import CatalogList from "../../components/catalogList/CatalogList";
import { products } from "../../data/products";
import { Product } from "../../types/product";
import { useDispatch } from "react-redux";
import { filtersSlice } from "../../store/reducers/filtersSlice";
import { useAppSelector } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import {dataSort} from '../../data/dataSort'

const separateSortName = (name: string) => {
    const [fisrtPart, ...secondPart] = name.split(" ")
    return (
        <div>
            {fisrtPart}
            <br></br>
            {secondPart.join(" ")}
        </div>
    )
}

interface CatalogProps {
    onClick: React.MouseEventHandler
}

const Catalog: FC<CatalogProps> = ({ onClick }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const productsRedux = useAppSelector(state => state.filterReducer.products)
    const filteredProducts = useAppSelector(state => state.filterReducer.filteredProducts)
    const filteredByType = useAppSelector(state => state.filterReducer.filteredByType)
    const filterTypeRedux = useAppSelector(state => state.filterReducer.type)
    const sotrRedux = useAppSelector(state => state.filterReducer.sort)

    const [sorting, setSorting] = useState(sotrRedux)

    const onChangeSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSorting(e.target.value)
        dispatch(filtersSlice.actions.changeSort(e.target.value))
    }

    const selectedFilter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (filterTypeRedux !== e.currentTarget.id) {
            const selectedFilterType = e.currentTarget.id
            dispatch(filtersSlice.actions.selectType(selectedFilterType))
            const sortByType: Product[] = []

            //Фильтр только по типу (все имеющиеся товары)
            productsRedux.map((prod) => {
                prod.filter.map(filterType => {
                    if (filterType === selectedFilterType) {
                        sortByType.push(prod)
                    }
                })
            })
            console.log(sortByType)
            dispatch(filtersSlice.actions.filteredByType(sortByType))
        }
        else {
            dispatch(filtersSlice.actions.selectType(""))
            dispatch(filtersSlice.actions.filteredByType(productsRedux))
        }
    }

    useEffect(() => {
        if (productsRedux.length === 0) {
            const localStorageProducts = localStorage.getItem('products')
            if (localStorageProducts === null) {
                dispatch(filtersSlice.actions.initState(products))
            }
            else {
                const productsLocal: Product[] = localStorageProducts !== null ? JSON.parse(localStorageProducts) : []
                if (productsLocal.length === 0) {
                    dispatch(filtersSlice.actions.initState(products))
                }
                else {
                    dispatch(filtersSlice.actions.initState(productsLocal))
                }
            }
            return () => {
                console.log("reset")
                dispatch(filtersSlice.actions.resetState())
            }
        }
    }, [filteredProducts, filteredByType])

    return (
        <div className="catalog" data-testid="catalog-page">
            <div className="catalog__navigate-desctop">
                <Breadcrumbs links={[{ link: "/sultan", name: "Каталог" }]} />
            </div>
            {/* <div className="catalog__navigate-mobil">
                <button onClick={() => navigate(-1)}><img src={arrow_end} /></button>
                <div>Назад</div>
            </div> */}
            {/* <div className="catalog__title">
                <h1>Каталог</h1>
                <div className="title__sort title__sort-desctop">
                    <div className="title">Сортировка:</div>
                    <select onChange={e => onChangeSorting(e)} value={sorting}>
                        <option value="name-dec">Название A-Я</option>
                        <option value="name-inc">Название Я-А</option>
                        <option value="price-dec">Цена по убыванию</option>
                        <option value="price-inc">Цена по возрастанию</option>
                    </select>
                </div>
            </div> */}
            {/* <div>
                <div className="sorting__list sorting__list-desctop">
                    {dataSort.map((product) => (
                        <div id={product.value} className={filterTypeRedux === product.value ? "sort__item sort__item-active" : "sort__item sort__item-disable"} key={product.value} onClick={e => selectedFilter(e)}>
                            {separateSortName(product.name)}
                        </div>
                    ))}
                </div>
            </div> */}
            <div className="catalog__content catalog__content-desctop catalog__content-mobil">
                {/* <Filters /> */}
                <div className="catalog__title">
                    <div className="title__sort-mobil">
                        <div className="title">Сортировка:</div>
                        <select onChange={e => onChangeSorting(e)} value={sorting}>
                            <option value="name-dec">Название A-Я</option>
                            <option value="name-inc">Название Я-А</option>
                            <option value="price-dec">Цена по убыванию</option>
                            <option value="price-inc">Цена по возрастанию</option>
                        </select>
                    </div>
                </div>
                <CatalogList onClick={onClick} />
            </div>
        </div>
    )
}

export default Catalog