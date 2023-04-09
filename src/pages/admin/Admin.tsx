import React, { FC, useEffect, useState } from "react";
import { Product } from "../../types/product";
import { products } from "../../data/products";
import AdminItem from "../../components/adminItem/AdminItem";
import './Admin.scss'
import AdminChangeProduct from "../../components/adminChangeProduct/AdminChangeProduct";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import arrow_end from '../../images/arrow__end.png'

const Admin: FC = () => {
    const [state, setState] = useState(0)
    const [productsAdmin, setProductsAdmin] = useState<Product[]>([])
    const localStor = localStorage.getItem('products')
    const navigate = useNavigate();

    const [isModal, setModal] = useState(false)
    const onClose = () => setModal(false)
    const startProduct: Product = {
        url: '',
        name: '',
        type: "weight",
        size: "",
        barcode: "",
        manufacturer: "",
        brand: "",
        description: "",
        price: 0,
        filter: []
    }

    const addProduct = () => {
        setModal(true)
    }

    const initProductsFromJSON = () => {
        localStorage.setItem('products', JSON.stringify(products));
        setProductsAdmin(products)
    }

    const changeState = () => {
        setState(state + 1)
    }

    useEffect(() => {
        const localStorageProducts = localStorage.getItem('products')
        if (localStorageProducts === null) {
            setProductsAdmin([])
        }
        else {
            const productsLocal: Product[] = localStorageProducts !== null ? JSON.parse(localStorageProducts) : []
            setProductsAdmin(productsLocal)
        }
    }, [localStor])

    return (
        <div className="admin" data-testid="admin-page">
            <div className="admin__navigate-desctop">
                <Breadcrumbs links={[{ link: "/sultan/admin", name: "Админка" }]} />
            </div>
            <div className="admin__navigate-mobil">
                <button onClick={() => navigate(-1)}><img src={arrow_end} /></button>
                <div>Назад</div>
            </div>
            {productsAdmin.length === 0 ? (
                <div className="admin__start">
                    <div>Нет добавленных товаров</div>
                    <div>Добавить товары из JSON ?</div>
                    <button data-testid="add_JSON" onClick={initProductsFromJSON}>ДА</button>
                    <button data-testid="add_new-product" onClick={addProduct}>Добавить новый товар</button>
                    <AdminChangeProduct
                        title="Добавление"
                        visible={isModal}
                        product={startProduct}
                        onClose={onClose}
                    />
                </div>
            ) : (
                <div>
                    <div className="admin__addProduct">
                        <button className="btn-addProduct" onClick={addProduct}>Добавить новый товар</button>
                    </div>
                    {productsAdmin.map((prod) => (
                        <AdminItem product={prod} key={prod.barcode} onClick={changeState} />
                    ))}
                    <AdminChangeProduct
                        title="Добавление"
                        visible={isModal}
                        product={startProduct}
                        onClose={onClose}
                    />
                </div>
            )}

        </div>
    )
}

export default Admin