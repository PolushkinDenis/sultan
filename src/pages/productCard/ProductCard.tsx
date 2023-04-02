import React, { FC, useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import { products } from "../../data/products";
import separator from "../../images/separator.png"
import { Product } from "../../types/product";
import "./ProductCard.scss"
import weight_img from '../../images/weight.png'
import volume_img from '../../images/volume.png'
import card_btn from '../../images/cart_btn.png'
import share from '../../images/share.png'
import price_list_img from '../../images/price_list-product.png'
import arrow_inc from '../../images/arrow_inc.png'
import arrow_dec from '../../images/arrow_dec.png'
import horizontalSplitter from '../../images/horizontalSplitter.png'

const dataSort = [
    { value: 'body', name: 'Уход за телом' },
    { value: 'hands', name: 'Уход за руками' },
    { value: 'legs', name: 'Уход за ногами' },
    { value: 'face', name: 'Уход за лицом' },
    { value: 'hair', name: 'Уход за волосами' },
    { value: 'suntan', name: 'Средства для загара' },
    { value: 'shaving', name: 'Средства для бритья' },
    { value: 'gift', name: 'Подарочные наборы' },
    { value: 'hygiene', name: 'Гигиеническая продукция' },
    { value: 'mouth', name: 'Гигиена полости рта' },
    { value: 'paper ', name: 'Бумажная продукция' },

]

interface ProductItem {
    product: Product,
    count: number
}

interface ProductCardProps {
    onClick: React.MouseEventHandler
}

const ProductCard: FC<ProductCardProps> = ({ onClick }) => {
    const { id } = useParams();
    const [countOfProduct, setCountOfProduct] = useState(1)
    const [product, setProduct] = useState<Product>()
    const [typeList, setTypeList] = useState<string>('')
    const [descriptionShow, setDescriptionShow] = useState(false)
    const [specificationsShow, setSpecificationsShow] = useState(false)
    const localStor = localStorage.getItem('card')

    const changeDescriptionShow = () => {
        setDescriptionShow(!descriptionShow)
    }
    const changeSpecificationsShow = () => {
        setSpecificationsShow(!specificationsShow)
    }

    const incCountOfProduct = () => {
        setCountOfProduct(countOfProduct + 1)
    }

    const decCountOfProduct = () => {
        if (countOfProduct > 1) {
            setCountOfProduct(countOfProduct - 1)
        }
    }

    const addToCard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        //dispatch(cardSlice.actions.addCard({ product, count: 1 }))

        const products: ProductItem[] = localStor !== null ? JSON.parse(localStor) : []

        //Если localeStorage пустой
        if (products?.length === 0) {
            if (product !== undefined) {
                const productToStorage: ProductItem[] = [{
                    count: countOfProduct,
                    product: product
                }]
                localStorage.setItem('card', JSON.stringify(productToStorage));
            }

        }

        if (products?.length > 0) {
            // Поиск в localeStorage, если уже есть элементы то увеличиваеи количество
            const index = products.findIndex(item => item.product.barcode === product?.barcode)
            if (index !== -1) {
                products[index].count += countOfProduct
                localStorage.setItem('card', JSON.stringify(products));
            }
            else {
                if (product !== undefined) {
                    const aaa: ProductItem[] = [{
                        count: countOfProduct,
                        product: product
                    }]
                    products.push(...aaa)
                    localStorage.setItem('card', JSON.stringify(products));
                }
            }
        }
        onClick(e)
    }

    console.log(product)
    //Получаем данные из localStorage или из JSON
    useEffect(() => {
        const localStorageProducts = localStorage.getItem('products')
        if (localStorageProducts === null) {
            const currentProduct: Product = products.filter(prod => prod.barcode === id)[0]
            const typesList: string[] = []
            currentProduct.filter.map(filter => {
                dataSort.map(data => {
                    if (filter === data.value) {
                        typesList.push(data.name)
                    }
                })
            })
            setTypeList(typesList.join(", "))
            setProduct(currentProduct)
        }
        else {
            const productsLocal: Product[] = localStorageProducts !== null ? JSON.parse(localStorageProducts) : []
            const currentProduct: Product = productsLocal.filter(prod => prod.barcode === id)[0]
            setProduct(currentProduct)
        }
    }, [])

    return (
        <div className="productCard">
            {product && (
                <div>
                    <Breadcrumbs links={[{ link: "/", name: "Каталог" }, { link: `/product/${product.barcode}`, name: product?.name }]} />

                    <div className="productCard__content">
                        <div className="productCard__content-img">
                            <img src={product.url} alt={product?.name} />
                        </div>
                        <div className="productCard__content-description">
                            <div className="description__availability">В наличии</div>
                            <h1 className="description__name">{product.name}</h1>
                            <div className="description__weight">
                                <img src={product.type === "weight" ? weight_img : volume_img} alt={product.type} />
                                {product.size}
                            </div>
                            <div className="description__card">
                                <div className="description__card-price">{product.price} ₸</div>
                                <div className="count__changing">
                                    <button onClick={decCountOfProduct}>-</button>
                                    <div className="description__card-count">{countOfProduct}</div>
                                    <button onClick={incCountOfProduct}>+</button>
                                </div>
                                <div className="toCard">
                                    <button onClick={addToCard} className="toCard-btn">В корзину<img src={card_btn} alt="price list" /></button>
                                </div>
                            </div>
                            <div className="description__share">
                                <img className="share_img" src={share} alt="Поделиться" />
                                <div className="share__add">При покупке от 10 000 ₸ бесплатная <br /> доставка по Кокчетаву и области</div>
                                <div className="share__price_list">
                                    <div>Прайс-лист</div>
                                    <img src={price_list_img} alt="price_list" />
                                </div>
                            </div>
                            <div className="description__shortList">
                                <div className="description__shortList-item"><p>Производитель:</p><span>{product.manufacturer}</span></div>
                                <div className="description__shortList-item"><p>Бренд:</p><span>{product.brand}</span></div>
                                <div className="description__shortList-item"><p>Артикул:</p><span>{product.barcode}</span></div>
                                <div className="description__shortList-item"><p>Штрихкод:</p><span>{product.barcode}</span></div>
                            </div>
                            <div className="description__show">
                                <button onClick={changeDescriptionShow}>Описание<img src={descriptionShow ? arrow_dec : arrow_inc} alt="->" /></button>
                                <div className={descriptionShow ? "descriptionShow active" : "descriptionShow disable"}>
                                    {product.description}
                                </div>
                            </div>
                            <img src={horizontalSplitter} alt="" />
                            <div className="specifications__show">
                                <button onClick={changeSpecificationsShow}>Характеристики<img src={specificationsShow ? arrow_dec : arrow_inc} alt="->" /></button>
                                <div className={specificationsShow ? "specificationsShow specifications-active" : "specificationsShow specifications-disable"}>
                                    <div className="specificationsShow-item"><p>Назначение:</p><span>{typeList}</span></div>
                                    <div className="specificationsShow-item"><p>Тип:</p><span>{product.type}</span></div>
                                    <div className="specificationsShow-item"><p>Производитель:</p><span>{product.manufacturer}</span></div>
                                    <div className="specificationsShow-item"><p>Бренд:</p><span>{product.brand}</span></div>
                                    <div className="specificationsShow-item"><p>Артикул:</p><span>{product.barcode}</span></div>
                                    <div className="specificationsShow-item"><p>Штрихкод:</p><span>{product.barcode}</span></div>
                                    <div className="specificationsShow-item"><p>Вес:</p><span>{product.size}</span></div>
                                    <div className="specificationsShow-item"><p>Объм:</p><span>{product.size}</span></div>
                                    <div className="specificationsShow-item"><p>Кол-во в коробке:</p><span>{product.size}</span></div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductCard