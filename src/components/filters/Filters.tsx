import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { products } from "../../data/products";
import { useAppSelector } from "../../hooks/redux";
import { filtersSlice } from "../../store/reducers/filtersSlice";
import { Product } from "../../types/product";
import './Filters.scss'
import { ManufacturersAndBrandListSelected } from "../../types/filters";
import deleteBtn from '../../images/deleteCard.png'
import horizontalSplitterFilter from '../../images/horizontalSplitterFilter.png'
import arrow_inc from '../../images/arrow_inc.png'
import arrow_dec from '../../images/arrow_dec.png'
import arrow_bth_show from '../../images/arrow_bth_show.png'
import arrow_bth_none from '../../images/arrow_bth_none.png'
import DropdownFilter from "./dropdownFilter/DropdownFilter";

const Filters: FC = () => {
    const [manufacturerSearch, setManufacturerSearch] = useState("")
    const [brandSearch, setBrandSearch] = useState("")

    const [priceFrom, setPriceFrom] = useState(0)
    const [priceTo, setPriceTo] = useState(10000)

    const [manufacturers, setManufacturers] = useState<ManufacturersAndBrandListSelected[]>([])
    const [manufacturersList, setManufacturersList] = useState<ManufacturersAndBrandListSelected[]>([])

    const [brands, setBrands] = useState<ManufacturersAndBrandListSelected[]>([])
    const [brandsList, setBrandsList] = useState<ManufacturersAndBrandListSelected[]>([])

    const productsRedux = useAppSelector(state => state.filterReducer.products)
    const manufacturersRedux = useAppSelector(state => state.filterReducer.manufacturer)

    const brandsRedux = useAppSelector(state => state.filterReducer.brand)

    const [showBlock, setShowBlock] = useState(true)

    const sortedProductsRedux = useAppSelector(state => state.filterReducer.filteredProducts)
    const filterTypeRedux = useAppSelector(state => state.filterReducer.type)

    const [showAllBrand, setShowAllBrand] = useState(false)
    const [showAllManufacturers, setShowAllManufacturers] = useState(false)

    const dispatch = useDispatch()

    const selectedFilter = (e: React.MouseEvent<HTMLDivElement>) => {
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
            dispatch(filtersSlice.actions.filteredByType(sortByType))
        }
        else {
            dispatch(filtersSlice.actions.selectType(""))
            dispatch(filtersSlice.actions.filteredByType(productsRedux))
        }
    }

    //Фильтрация по поиску производителей
    const searchManufacturer = (e: React.ChangeEvent<HTMLInputElement>) => {
        setManufacturerSearch(e.target.value)
        console.log(manufacturers.filter(manufacturer => manufacturer.name.includes(e.target.value)))
        setManufacturersList(manufacturers.filter(manufacturer => manufacturer.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())))
    }
    //Фильтрация по поиску бренда
    const searchBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBrandSearch(e.target.value)
        console.log(brands.filter(manufacturer => manufacturer.name.includes(e.target.value)))
        setBrandsList(brands.filter(brnd => brnd.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())))
    }
    //Ввод цены от
    const changePriceFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value) >= 0) {
            setPriceFrom(Number(e.target.value))
        }
    }
    //Ввод цены до
    const changePriceTo = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value) >= 0) {
            setPriceTo(Number(e.target.value))
        }
    }

    const onBlurPriceFrom = () => {
        if (priceFrom >= 0 && priceFrom > priceTo) {
            setPriceTo(priceFrom)
            setPriceFrom(priceTo)
        }
    }

    const onBlurPriceTo = () => {
        if (priceTo >= 0 && priceTo < priceFrom) {
            setPriceTo(priceFrom)
            setPriceFrom(priceTo)
        }
    }

    //Применить фильтры
    const applyFilters = () => {
        //По цене
        let filteredProducts: Product[] = []
        let newProducts = productsRedux.filter(prod => prod.price <= priceTo)
        newProducts = newProducts.filter(prod => prod.price >= priceFrom)

        // Количество выбранных фильров по производителю
        let countOfSelectManufacturers = 0
        if (manufacturersRedux && manufacturersRedux?.length > 0) {
            manufacturersRedux.map(manufacturer => {
                if (manufacturer.check === true) {
                    countOfSelectManufacturers += 1
                }
            })
        }

        // Если выбраны производители то фильтруем по ним
        if (countOfSelectManufacturers > 0) {
            newProducts.map((prod => {
                manufacturersRedux?.map(manufacturer => {
                    if (manufacturer.name === prod.manufacturer && manufacturer.check === true) {
                        filteredProducts.push(prod)
                    }
                })
            }))
        }
        else {
            filteredProducts.push(...newProducts)
        }

        // Количество выбранных фильров по бренду
        let countOfSelectBrands = 0
        if (brandsRedux && brandsRedux?.length > 0) {
            brandsRedux.map(brnd => {
                if (brnd.check === true) {
                    countOfSelectBrands += 1
                }
            })
        }

        const filteredByBrandProducts: Product[] = []
        if (countOfSelectBrands > 0) {
            newProducts.map((prod => {
                brandsRedux?.map(brnd => {
                    if (brnd.name === prod.brand && brnd.check === true) {
                        filteredByBrandProducts.push(prod)
                    }
                })
            }))
        }
        else {
            filteredByBrandProducts.push(...newProducts)
        }

        //Обьединение двух массив (1: сортированный по производителю, 2: сорттированный по бренду)
        const mergedArrayWithoutRepeat: Product[] = []
        filteredProducts.map((byManufactur) => {
            filteredByBrandProducts.map((byBrand) => {
                if (byManufactur.barcode === byBrand.barcode) {
                    mergedArrayWithoutRepeat.push(byManufactur)
                }
            })
        })
        dispatch(filtersSlice.actions.filteredByMain(mergedArrayWithoutRepeat))
    }

    //Удалить фильтры
    const deleteFilters = () => {
        setPriceFrom(0)
        setPriceTo(10000)
        setManufacturerSearch("")
        setManufacturersList(manufacturers)
        setBrandSearch("")
        setBrandsList(brands)
        dispatch(filtersSlice.actions.resetManufacturer())
        dispatch(filtersSlice.actions.resetBrand())
        dispatch(filtersSlice.actions.resetFiltered())
    }

    useEffect(() => {     // Подсчет количесва производителей
        const localStorageProducts = localStorage.getItem('products')
        if (localStorageProducts === null) {
            const arrayOfManufacturers: ManufacturersAndBrandListSelected[] = []

            products.map(product => {
                const index = arrayOfManufacturers.findIndex(manufacturer => manufacturer.name === product.manufacturer)
                if (index == -1) {
                    const count = products.filter(x => x.manufacturer === product.manufacturer).length
                    const newManufacturers = {
                        name: product.manufacturer,
                        count: count,
                        check: false
                    }
                    arrayOfManufacturers.push(newManufacturers)
                }
            })

            setManufacturers(arrayOfManufacturers)
            setManufacturersList(arrayOfManufacturers)
            dispatch(filtersSlice.actions.initManufacturer(arrayOfManufacturers))

            const arrayOfBrand: ManufacturersAndBrandListSelected[] = []
            products.map(product => {
                const index = arrayOfBrand.findIndex(brand => brand.name === product.brand)
                if (index == -1) {
                    const count = products.filter(x => x.brand === product.brand).length
                    const newBrands = {
                        name: product.brand,
                        count: count,
                        check: false
                    }
                    arrayOfBrand.push(newBrands)
                }
            })
            setBrands(arrayOfBrand)
            setBrandsList(arrayOfBrand)
            dispatch(filtersSlice.actions.initBrand(arrayOfBrand))
        }
        else {
            const productsLocal: Product[] = localStorageProducts !== null ? JSON.parse(localStorageProducts) : []
            const arrayOfManufacturers: ManufacturersAndBrandListSelected[] = []
            productsLocal.map(product => {
                const index = arrayOfManufacturers.findIndex(manufacturer => manufacturer.name === product.manufacturer)
                if (index == -1) {
                    const count = productsLocal.filter(x => x.manufacturer === product.manufacturer).length
                    const newManufacturers = {
                        name: product.manufacturer,
                        count: count,
                        check: false
                    }
                    arrayOfManufacturers.push(newManufacturers)
                }
            })
            setManufacturers(arrayOfManufacturers)
            setManufacturersList(arrayOfManufacturers)
            dispatch(filtersSlice.actions.initManufacturer(arrayOfManufacturers))

            const arrayOfBrand: ManufacturersAndBrandListSelected[] = []
            productsLocal.map(product => {
                const index = arrayOfBrand.findIndex(brand => brand.name === product.brand)
                if (index == -1) {
                    const count = productsLocal.filter(x => x.brand === product.brand).length
                    const newBrands = {
                        name: product.brand,
                        count: count,
                        check: false
                    }
                    arrayOfBrand.push(newBrands)
                }
            })
            setBrands(arrayOfBrand)
            setBrandsList(arrayOfBrand)
            dispatch(filtersSlice.actions.initBrand(arrayOfBrand))
        }
    }, [])

    return (
        <div className="filters">
            <div className="filters-title filters-title-mobil">
                <h2>ПОДБОР ПО ПАРАМЕТРАМ</h2>
                <button onClick={e => setShowBlock(!showBlock)}><img src={showBlock ? arrow_bth_show : arrow_bth_none} alt="" /></button>
            </div>
            <div className={showBlock ? "showBlock" : "noneBlock"}>
                <div className="filters__price-title">
                    <p className="price-title">Цена</p>
                    <p className="price-type">₸</p>
                </div>
                <div className="filters__price">
                    <input type="text" placeholder="0" value={priceFrom} onChange={e => changePriceFrom(e)} onBlur={onBlurPriceFrom} />
                    <div className="filters__price-separator">-</div>
                    <input type="text" placeholder="10 000" value={priceTo} onChange={e => changePriceTo(e)} onBlur={onBlurPriceTo} />
                </div>
                <div className="filters__manufacturer">
                    <h3>Производитель</h3>
                    <div className="manufacturer__search">
                        <input data-testid="manufacturer_search" className="search-input" type="text" placeholder="Поиск..." value={manufacturerSearch} onChange={e => searchManufacturer(e)} />
                        <input className="search-button" type="button" />
                    </div>
                    <div>
                        {manufacturersList.map(manufacturer => (
                            <div className={!showAllManufacturers ? "manufacturer__list-item" : "manufacturer__list-allItem"} key={manufacturer.name}>
                                <DropdownFilter listFilter={manufacturer} type="manufacturer" />
                            </div>
                        ))}
                    </div>
                    <div className="swoh__all"><button onClick={e => setShowAllManufacturers(!showAllManufacturers)}>Показать все</button><img src={showAllManufacturers ? arrow_dec : arrow_inc} alt="" /></div>
                </div>
                <img className="horizontalSplitterFilter" src={horizontalSplitterFilter} alt="" />
                <div className="filters__manufacturer">
                    <h3>Бренд</h3>
                    <div className="manufacturer__search">
                        <input className="search-input" type="text" placeholder="Поиск..." value={brandSearch} onChange={e => searchBrand(e)} />
                        <input className="search-button" type="button" />
                    </div>
                    <div>
                        {brandsList.map(brand => (
                            <div className={!showAllBrand ? "brands__list-item" : "brands__list-allItem"} key={brand.name}>
                                <DropdownFilter listFilter={brand} type="brand" />
                            </div>
                        ))}
                    </div>
                    <div className="swoh__all"><button onClick={e => setShowAllBrand(!showAllBrand)}>Показать все</button><img src={showAllBrand ? arrow_dec : arrow_inc} alt="" /></div>
                </div>
                <div className="filters__btns">
                    <button data-testid="btn-show" className="btn__show" onClick={applyFilters}>Показать</button>
                    <button className="btn__delete" onClick={deleteFilters}><img src={deleteBtn} alt="delete" /></button>
                </div>
            </div>
            <div className="filters__types">
                <div className={filterTypeRedux === "body" ? "types selected" : "types"} id="body" onClick={e => selectedFilter(e)}>Уход за телом</div>
                <div className={filterTypeRedux === "hands" ? "types selected" : "types"} id="hands" onClick={e => selectedFilter(e)}>Уход за руками</div>
                <div className={filterTypeRedux === "legs" ? "types selected" : "types"} id="legs" onClick={e => selectedFilter(e)}>Уход за ногами</div>
                <div className={filterTypeRedux === "face" ? "types selected" : "types"} id="face" onClick={e => selectedFilter(e)}>Уход за лицом</div>
                <div className={filterTypeRedux === "hair" ? "types selected" : "types"} id="hair" onClick={e => selectedFilter(e)}>Уход за волосами</div>
                <div className={filterTypeRedux === "suntan" ? "types selected" : "types"} id="suntan" onClick={e => selectedFilter(e)}>Средства для загара</div>
                <div className={filterTypeRedux === "shaving" ? "types selected" : "types"} id="shaving" onClick={e => selectedFilter(e)}>Средства для бритья</div>
                <div className={filterTypeRedux === "gift" ? "types selected" : "types"} id="gift" onClick={e => selectedFilter(e)}>Подарочные наборы</div>
                <div className={filterTypeRedux === "hygiene" ? "types selected" : "types"} id="hygiene" onClick={e => selectedFilter(e)}>Гигиеническая продукция</div>
                <div className={filterTypeRedux === "mouth" ? "types selected" : "types"} id="mouth" onClick={e => selectedFilter(e)}>Гигиена полости рта</div>
                <div className={filterTypeRedux === "paper" ? "types selected" : "types"} id="paper" onClick={e => selectedFilter(e)}>Бумажная продукция</div>
            </div>
        </div>
    )
}

export default Filters