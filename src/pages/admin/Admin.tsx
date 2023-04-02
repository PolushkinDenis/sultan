import React, { FC, useEffect, useState } from "react";
import { Product } from "../../types/product";
import { products } from "../../data/products";
import AdminItem from "../../components/adminItem/AdminItem";
import './Admin.scss'
import AdminChangeProduct from "../../components/adminChangeProduct/AdminChangeProduct";

const Admin: FC = () => {
    const [state, setState] = useState(0)
    const [productsAdmin, setProductsAdmin] = useState<Product[]>([])
    const localStor = localStorage.getItem('products')

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
        console.log("ASDASd")
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

    console.log(productsAdmin)
    console.log(isModal)
    return (
        <div className="admin">
            {productsAdmin.length === 0 ? (
                <div className="admin__start">
                    <div>Нет добавленных товаров</div>
                    <div>Добавить товары из JSON ?</div>
                        <button onClick={initProductsFromJSON}>ДА</button>
                        <button onClick={addProduct}>Добавить новый товар</button>

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