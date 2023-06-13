import React, { FC, useEffect, useState } from "react";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import "./Card.scss"
import horizontalSplitter_card from "../../images/horizontalSplitter_card.png"
import { Product } from "../../types/product";
import CardItem from "../../components/cardItem/CardItem";
import MakeOrder from "../../components/makeOrder/MakeOrder";
import { useNavigate } from "react-router-dom";
import arrow_end from '../../images/arrow__end.png'

interface ProductItem {
    product: Product,
    count: number
}

interface CardProps {
    onClick: React.MouseEventHandler
}

const Card: FC<CardProps> = ({ onClick }) => {
    const [productList, setProductList] = useState<ProductItem[]>([])
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const localStor = localStorage.getItem('card')
    const navigate = useNavigate();

    const [isModal, setModal] = useState(false)
    const onClose = () => setModal(false)

    useEffect(() => {
        const localStor = localStorage.getItem('card')
        const products: ProductItem[] = localStor !== null ? JSON.parse(localStor) : []
        let sum = 0
        products.map((prod) => {
            sum = sum + prod.count * prod.product.price
        })
        setTotalPrice(sum)
        setProductList(products)

    }, [localStor])

    const makeOrder = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setModal(true)
        localStorage.setItem('card', JSON.stringify([]));
        onClick(e)
    }

    
    return (
        <div className="card" data-testid="card-page">
            <div className="card__navigate-desctop">
                <Breadcrumbs links={[{ link: '/sultan/card', name: 'Козина' }]} />
            </div>
            <div className="card__navigate-mobil">
                <button onClick={() => navigate(-1)}><img src={arrow_end} /></button>
                <div>Назад</div>
            </div>
            <h1>КОРЗИНА</h1>
            <img className="horizontalSplitter_card" src={horizontalSplitter_card} alt="" />
            {productList.map((product) => (
                <CardItem product={product} key={product.product.barcode} onClick={onClick} />
            ))}
            <div className="card__createOrder">
                <button onClick={makeOrder} className="createOrder">Оформить заказ</button>
                <div className="totalPrice">{totalPrice} ₸</div>
            </div>
            <MakeOrder
                visible={isModal}
                onClose={onClose}
            />
        </div>
    )
}

export default Card