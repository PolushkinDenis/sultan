import React, { FC, useState } from "react";
import { Product } from "../../types/product";
import weight_img from '../../images/weight.png'
import volume_img from '../../images/volume.png'
import separatorCardItem from '../../images/separatorCardItem.png'
import deleteCard from '../../images/deleteCard.png'
import horizontalSplitter_card from "../../images/horizontalSplitter_card.png"
import "./CardItem.scss"

interface ProductItem {
    product: Product,
    count: number
}

interface CardItemProps {
    onClick: React.MouseEventHandler
    product: ProductItem
}

const CardItem: FC<CardItemProps> = ({ product, onClick }) => {
    const localStor = localStorage.getItem('card')

    const [countOfProduct, setCountOfProduct] = useState(product.count)

    const incCountOfProduct = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setCountOfProduct(countOfProduct + 1)
        // Увеличивем количество в LocalStorage
        const products: ProductItem[] = localStor !== null ? JSON.parse(localStor) : []
        const index = products.findIndex(item => item.product.barcode === product.product.barcode)
        if (index !== -1) {
            products[index].count = countOfProduct + 1
            localStorage.setItem('card', JSON.stringify(products));
        }
        onClick(e)
    }

    const decCountOfProduct = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (countOfProduct > 1) {
            setCountOfProduct(countOfProduct - 1)
            // Уменьшаем количество в LocalStorage
            const products: ProductItem[] = localStor !== null ? JSON.parse(localStor) : []
            const index = products.findIndex(item => item.product.barcode === product.product.barcode)
            if (index !== -1) {
                products[index].count = countOfProduct - 1
                localStorage.setItem('card', JSON.stringify(products));
            }
            onClick(e)
        }
    }

    const deleteProduct = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const products: ProductItem[] = localStor !== null ? JSON.parse(localStor) : []
        const newProducts = products.filter(prod => prod.product.barcode !== product.product.barcode)
        localStorage.setItem('card', JSON.stringify(newProducts));
        onClick(e)
    }

    return (
        <>
            <div className="cardItem">
                <div className="cardItem__content">
                    <div className="cardItem__image"><img src={product.product.url} alt={product.product.name} /></div>
                    <div className="cardItem__description">
                        <div className="cardItem__description-weight">
                            <img src={product.product.type === "weight" ? weight_img : volume_img} />
                            <p>{product.product.size}</p>
                        </div>
                        <div className="cardItem__description-name">{product.product.name}</div>
                        <div className="cardItem__description-description">{product.product.description}</div>
                    </div>
                </div>
                <div className="cardItem__content-second">
                    <div className="cardItem__count-changing">
                        <img className="cardItem__count-separatorStart" src={separatorCardItem} />
                        <button onClick={decCountOfProduct}>-</button>
                        <div className="cardItem__count-count">{countOfProduct}</div>
                        <button onClick={incCountOfProduct}>+</button>
                        <img className="cardItem__count-separatorEnd" src={separatorCardItem} />
                    </div>
                    <div className="cardItem__name">
                        {product.product.price * countOfProduct} ₸
                        <img className="cardItem__separator" src={separatorCardItem} />
                    </div>
                    <button onClick={deleteProduct} className="cardItem__delete"><img src={deleteCard} alt="delete" /></button>
                </div>
            </div>
            <img className="horizontalSplitter_card" src={horizontalSplitter_card} alt="" />
        </>
    )
}

export default CardItem