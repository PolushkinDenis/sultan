import React, { FC, useEffect, useState } from "react";
import "./Header.scss";
import geo from '../../images/geo.png'
import mail from '../../images/mail.png'
import logo from '../../images/logo.png'
import catalog_btn from '../../images/catalog_btn.png'
import price_list from '../../images/price_list.png'
import card from '../../images/card.png'
import manager from '../../images/manager.png'
import { useAppSelector } from "../../hooks/redux";
import { Product } from "../../types/product";
import { NavLink } from "react-router-dom";

interface HeaderProps {
    cardCount: number
    cardSum: number
}

const Header: FC<HeaderProps> = ({ cardCount, cardSum }) => {
    // const cardCount = useAppSelector(state => state.cardReducer.products).length

    // const cardStore = localStorage.getItem('card')
    // const products: Product[] = cardStore !== null ? JSON.parse(cardStore) : []

    // const [cardCount, setCardCount] = useState(0)

    // console.log(cardStore)

    // useEffect(() => {
    //     const cardStore = localStorage.getItem('card')
    //     const products: Product[] = cardStore !== null ? JSON.parse(cardStore) : []
    // }, [])

    return (
        <header className="header">
            <div className="header__content-first">
                <div className="header__contacts">
                    <div className="header__box">
                        <img className="header__geo" src={geo} alt="geo" />
                        <div className="header__address">
                            <p className="header__address-main">г. Кокчетав, ул. Ж. Ташенова 129Б</p>
                            <p className="header__address-secondary">(Рынок Восточный)</p>
                        </div>
                    </div>
                    <div className="header__box">
                        <img className="header__mail" src={mail} alt="mail" />
                        <div className="header__address">
                            <p className="header__address-main">г. Кокчетав, ул. Ж. Ташенова 129Б</p>
                            <p className="header__address-secondary">(Рынок Восточный)</p>
                        </div>
                    </div>
                </div>
                <div className="header__links">
                    <a href="#">О компании</a>
                    <a href="#">Доставка и оплата</a>
                    <a href="#">Возврат</a>
                    <a href="#">Контакты</a>
                </div>
            </div>
            <hr />
            <div className="header__content-second">
                <NavLink to="/"><img className="logo" src={logo} alt="Султан" /></NavLink>
                <button className="header__catalog-btn">Каталог<img src={catalog_btn} alt="catalog" /></button>
                <div className="header__search">
                    <input className="search-input" type="text" placeholder="Поиск..." />
                    <input className="search-button" type="button" />
                </div>
                <div className="header__phone">
                    <p className="phone">+7 (777) 490-00-91</p>
                    <p className="time">время работы: 9:00-20:00</p>
                    <p className="make_order">Заказать звонок</p>
                </div>
                <img className="manager" src={manager} alt="manager" />
                <button className="header__price-btn">Прайс-лист<img src={price_list} alt="price list" /></button>
                <div className="header__card">
                    <NavLink to="/card"><img src={card} alt="card" />
                        <div className="header__card-count">{cardCount}</div>
                    </NavLink>
                </div>
                <div className="header__card-price">
                    <p className="card-title">Корзина</p>
                    <p className="price">{cardSum} ₸</p>
                </div>
            </div>
            <hr />
        </header>
    )
}

export default Header
