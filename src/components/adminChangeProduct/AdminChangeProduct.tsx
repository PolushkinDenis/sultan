import React, { FC, useEffect, useState } from "react";
import { Product } from "../../types/product";
import './AdminChangeProduct.scss'
import { dataSort } from '../../data/dataSort'

interface ListOfChecked {
    value: string,
    check: boolean,
    name: string
}

interface AdminChangeProductProps {
    title: string
    visible: boolean
    product: Product
    onClose: () => void
}

const AdminChangeProduct: FC<AdminChangeProductProps> = ({
    title,
    visible = false,
    product,
    onClose,
}) => {

    const [name, setName] = useState(product.name)
    const [type, setType] = useState<"weight" | "volume">(product.type)
    const [size, setSize] = useState(product.size)
    const [barcode, setBarcode] = useState(product.barcode)
    const [manufacturer, setManufacturer] = useState(product.manufacturer)
    const [brand, setBrand] = useState(product.brand)
    const [description, setDescription] = useState(product.description)
    const [filter, setFilter] = useState<string[]>(product.filter)
    const [price, setPrice] = useState<number>(product.price)
    const [url, setUrl] = useState(product.url)

    const [selectedFilter, setSelectedFilter] = useState<string[]>(product.filter)
    const [error, setError] = useState("")
    const [added, setAdded] = useState(false)

    const [listOfFilter, setListOfFilter] = useState<ListOfChecked[]>([])

    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const changeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "weight") {
            setType("weight")
        }
        else {
            setType("volume")
        }
    }
    const changeBarcode = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value)) {
            setBarcode(e.target.value)
        }
    }
    const changePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value)) {
            setPrice(Number(e.target.value))
        }
        if (e.target.value === "") {
            setPrice(0)
        }
    }

    const changeListOfFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked
        const newListOfFilter: ListOfChecked[] = JSON.parse(JSON.stringify(listOfFilter))
        newListOfFilter.map((filter) => {
            if (filter.value === e.target.value) {
                filter.check = checked
            }
        })
        // Добавляем исходные фильтры

        // Добавляем фильтр если он выбран
        if (checked === true) {
            const newFilters: string[] = []
            if (filter.length === 0) {
                newFilters.push(...filter, e.target.value)
                setFilter(newFilters)
            }
            else {
                if (filter.filter(fltr => fltr === e.target.value).length === 0) {
                    newFilters.push(...filter, e.target.value)
                    setFilter(newFilters)
                }
            }
        }
        // Удаляем фильтр
        else {
            const newFilters: string[] = [...filter]
            const index = filter.findIndex(fltr => fltr === e.target.value)
            newFilters.splice(index, 1);
            setFilter(newFilters)
        }
        console.log(newListOfFilter)
        setListOfFilter(newListOfFilter)
    }

    const saveProduct = () => {
        const newProduct: Product = {
            barcode,
            brand,
            description,
            filter,
            manufacturer,
            name,
            price,
            size,
            type,
            url
        }

        if (barcode === "" || brand === "" || description === "" || filter.length === 0 ||
            manufacturer === "" || name === "" || price === 0 || size === "" || type.length === 0 || url === "") {
            setError("Заполните все поля")
        }
        else { //Добавляем в зависимоти от состава хранилища
            const newProductArray = [newProduct]
            const localStorageProducts = localStorage.getItem('products')
            if (localStorageProducts === null) {
                setAdded(true)
                localStorage.setItem('products', JSON.stringify(newProductArray));
            }
            else if (localStorageProducts === "[]") {
                setAdded(true)
                localStorage.setItem('products', JSON.stringify(newProductArray));
            }
            else if (title === "Добавление") {
                const localStorageProductsTypes: Product[] = JSON.parse(localStorageProducts)
                const index = localStorageProductsTypes.findIndex(prod => prod.barcode === newProduct.barcode)
                if (index === -1) {
                    setAdded(true)
                    localStorageProductsTypes.push(newProduct)
                    localStorage.setItem('products', JSON.stringify(localStorageProductsTypes));
                }
                else {
                    setError("Товар с таким штрихкодом уже существует")
                }
            }
            else if (title === "Изменение") {
                const localStorageProductsTypes: Product[] = JSON.parse(localStorageProducts)
                const index = localStorageProductsTypes.findIndex(prod => prod.barcode === newProduct.barcode)
                localStorageProductsTypes[index] = newProduct
                setAdded(true)
                localStorage.setItem('products', JSON.stringify(localStorageProductsTypes));
            }
        }
    }

    useEffect(() => {
        const newListOfFilter: ListOfChecked[] = []
        if (selectedFilter.length === 0) {
            dataSort.map((sort) => {
                const newFilter: ListOfChecked = {
                    check: false,
                    value: sort.value,
                    name: sort.name
                }
                newListOfFilter.push(newFilter)
            })
        }
        else {
            dataSort.map((sort) => {
                selectedFilter.map(fltr => {
                    if (sort.value === fltr) {
                        const newFilter: ListOfChecked = {
                            check: true,
                            value: sort.value,
                            name: sort.name
                        }
                        newListOfFilter.push(newFilter)
                    }
                    else {
                        if (newListOfFilter.filter(list => list.value === sort.value).length === 0) {
                            if (selectedFilter.filter(select => select === sort.value).length === 0) {
                                const newFilter: ListOfChecked = {
                                    check: false,
                                    value: sort.value,
                                    name: sort.name
                                }
                                newListOfFilter.push(newFilter)
                            }
                        }
                    }
                })
            })
        }
        setListOfFilter(newListOfFilter)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setError("")
        }, 2000)
    }, [error])

    useEffect(() => {
        setTimeout(() => {
            setAdded(false)
        }, 2000)
    }, [added])

    if (!visible) return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-dialog" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <span className="modal-close" onClick={onClose}>
                        &times;
                    </span>
                </div>
                <div className="modal__title">{title}</div>
                <div className="modal-body">
                    <div className="item"><p>Название</p><input type="text" placeholder="Название" value={name} onChange={e => changeName(e)} /></div>
                    <div className="item">
                        <p>Тип размера</p>
                        <select value={type} onChange={e => changeType(e)}>
                            <option value="weight">Вес</option>
                            <option value="volume">Объем</option>
                        </select>
                    </div>
                    <div className="item"><p>Размер</p><input data-testid="size" type="text" placeholder="Размер" value={size} onChange={e => setSize(e.target.value)} /></div>
                    <div className="item"><p>Штрихкод</p><input type="text" placeholder="Штрихкод" value={barcode} onChange={e => changeBarcode(e)} /></div>
                    <div className="item"><p>Производитель</p><input type="text" placeholder="Производитель" value={manufacturer} onChange={e => setManufacturer(e.target.value)} /></div>
                    <div className="item"><p>Бренд</p><input type="text" value={brand} placeholder="Бренд" onChange={e => setBrand(e.target.value)} /></div>
                    <div className="item"><p>Описание</p><input type="text" value={description} placeholder="Описание" onChange={e => setDescription(e.target.value)} /></div>
                    <div className="item"><p>Цена</p><input type="text" data-testid="price" value={price} placeholder="Цена" onChange={e => changePrice(e)} /></div>
                    <div className="item"><p>Url картинки</p><input type="text" value={url} placeholder="Url" onChange={e => setUrl(e.target.value)} /></div>
                    <div>
                        {listOfFilter.map(sort => (
                            <div key={sort.value}>
                                <input data-testid={`checkbox_${sort.value}`} type="checkbox" checked={sort.check} value={sort.value} onChange={e => changeListOfFilter(e)} />
                                <span>{sort.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="modal__save">
                    <div data-testid="error" className="modal__save-error">{error}</div>
                    <div className={added ? "modal__save-added" : "modal__save-notadded"} >{title === "Добавление" ? "Добавлено" : "Изменено"}</div>
                    <button data-testid="add-new-product" className="modal__save-btn" onClick={saveProduct}>Сохранить</button>
                </div>
            </div>
        </div>
    )
}

export default AdminChangeProduct