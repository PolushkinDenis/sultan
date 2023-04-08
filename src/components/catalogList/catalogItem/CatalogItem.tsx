import React, { FC } from "react";
import './CatalogItem.scss'
import { Product } from "../../../types/product";
import weight_img from "../../../images/weight.png"
import volume_img from "../../../images/volume.png"
import { NavLink } from "react-router-dom";
import cart_btn from '../../../images/cart_btn.png'
import { Link } from "react-router-dom";

interface ProductItem {
    product: Product,
    count: number
}

interface CatalogItemProps {
    product: Product,
    onClick: React.MouseEventHandler
}

const CatalogItem: FC<CatalogItemProps> = ({ product, onClick }) => {
    const localStor = localStorage.getItem('card')

    const addProductToCard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const products: ProductItem[] = localStor !== null ? JSON.parse(localStor) : []

        //Если localeStorage пустой
        if(products?.length === 0) {
            const productToStorage: ProductItem[] = [{
                count: 1,
                product: product
            }]
            localStorage.setItem('card', JSON.stringify(productToStorage));
        }
        
        if(products?.length > 0) {
            // Поиск в localeStorage, если уже есть элементы то увеличиваеи количество
            const index = products.findIndex(item => item.product.barcode === product.barcode)
            if(index !== -1) {
                products[index].count += 1
                localStorage.setItem('card', JSON.stringify(products));
            }
            else {
                const aaa: ProductItem[] = [{
                    count: 1,
                    product: product
                }]
                products.push(...aaa)
                localStorage.setItem('card', JSON.stringify(products));
            } 
        }
        onClick(e)
    }

    return (
        <div className="catalogItem">
            <div className="catalogItem__box">
                <div className="product__photo">
                    <img src={product.url} />
                </div>
                <div className="product__size">
                    <img src={product.type === "weight" ? weight_img : volume_img} />
                    <p>{product.size}</p>
                </div>
                <Link data-testid="productCard-link" to={`/sultan/product/${product.barcode}`}><p className="product__name">{product.name}</p></Link>
                <div className="product__addition">
                    <div className="addition__title">Штрихкод: <p>{product.barcode}</p></div>
                    <div className="addition__title">Производитель:: <p>{product.manufacturer}</p></div>
                    <div className="addition__title">Бренд:: <p>{product.brand}</p></div>
                </div>
                <div className="catalogItem__box-toCard">
                    <div>{product.price} ₸</div>
                    <button className="addToCard-btn" onClick={e => addProductToCard(e)}>В корзину <img src={cart_btn}/></button>
                </div>
            </div>
        </div>
    )
}

export default CatalogItem