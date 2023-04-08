import React, { FC, useState } from "react";
import { Product } from "../../types/product";
import './AdminItem.scss'
import horizontalSplitter_card from "../../images/horizontalSplitter_card.png"
import AdminChangeProduct from "../adminChangeProduct/AdminChangeProduct";

interface AdminItemProps {
    product: Product,
    onClick: React.MouseEventHandler
}

const AdminItem: FC<AdminItemProps> = ({ product, onClick }) => {
    const [isModal, setModal] = useState(false)
    const onClose = () => setModal(false)

    const deleteProduct = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const localStorData = localStorage.getItem('products')
        const products: Product[] = localStorData !== null ? JSON.parse(localStorData) : []
        const newProducts = products.filter(prod => prod.barcode !== product.barcode)
        localStorage.setItem('products', JSON.stringify(newProducts));
        onClick(e)
    }

    const changeProduct = () => {
        setModal(true)
    }

    return (
        <div className="adminItem">
            <img className="product__img" src={product.url} />
            <div className="adminItem__item"><p>Название: </p><span>{product.name}</span></div>
            <div className="adminItem__item"><p>Тип размера: </p><span>{product.type}</span></div>
            <div className="adminItem__item"><p>Размер: </p><span>{product.size}</span></div>
            <div className="adminItem__item"><p>Штрихкод: </p><span>{product.barcode}</span></div>
            <div className="adminItem__item"><p>Производитель: </p><span>{product.manufacturer}</span></div>
            <div className="adminItem__item"><p>Бренд: </p><span>{product.brand}</span></div>
            <div className="adminItem__item"><p>Описание: </p><span>{product.description}</span></div>
            <div className="adminItem__item"><p>Цена: </p><span>{product.price}</span></div>
            <div className="adminItem__btn-group">
                <button onClick={deleteProduct}>Удалить</button>
                <button onClick={changeProduct}>Изменить</button>
            </div>
            <img className="horizontalSplitter_card" src={horizontalSplitter_card} alt="" />
            <AdminChangeProduct
                title="Изменение"
                product={product}
                visible={isModal}
                onClose={onClose}
            />
        </div>
    )
}

export default AdminItem