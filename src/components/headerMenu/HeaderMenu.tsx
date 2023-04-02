import React, { FC } from "react";
import './HeaderMenu.scss'
import geo from '../../images/geo.png'
import mail from '../../images/mail.png'
import phone_menu from '../../images/phone_menu.png'
import phone_menu_active from '../../images/phone_menu_active.png'
import horizontalSplitter from '../../images/horizontalSplitter.png'
import price_list from '../../images/price_list.png'
import { NavLink } from "react-router-dom";

interface HeaderMenuProps {
    visible: boolean
    onClose: () => void
}

const HeaderMenu: FC<HeaderMenuProps> = ({ visible = false, onClose }) => {


    if (!visible) return null;

    return (
        <div className="headerMenu" onClick={onClose}>
            <div className="headerMenu-dialog-order" onClick={e => e.stopPropagation()}>
                <div>
                    <div className="headerMenu__box">
                        <img className="header__geo" src={geo} alt="geo" />
                        <div className="header__address">
                            <p className="header__address-main">г. Кокчетав, ул. Ж. Ташенова 129Б</p>
                            <p className="header__address-secondary">(Рынок Восточный)</p>
                        </div>
                    </div>
                    <div className="headerMenu__box">
                        <img className="header__mail" src={mail} alt="mail" />
                        <div className="header__address">
                        <p className="header__address-main">opt.sultan@mail.ru</p>
                            <p className="header__address-secondary">На связи в любое время</p>
                        </div>
                    </div>
                    <div className="headerMenu__box">
                        <img className="header__mail" src={phone_menu} alt="phone" />
                        <div className="header__address">
                            <p className="header__address-main">Отдел продаж</p>
                            <p className="header__address-secondary">+7 (777) 490-00-91</p>
                        </div>
                    </div>
                    <div className="headerMenu__call">
                        <button className="headerMenu__phone"><img src={phone_menu_active} alt="phone"/></button>
                        <span>Заказать звонок</span>
                    </div>
                    <img src={horizontalSplitter}/>
                    <div className="headerMenu__siteMenu">
                        <div className="headerMenu__siteMenu-header">Меню сайта:</div>
                        <div className="headerMenu__siteMenu-item">О компании</div>
                        <div className="headerMenu__siteMenu-item">Доставка и оплата</div>
                        <div className="headerMenu__siteMenu-item">Возврат</div>
                        <div className="headerMenu__siteMenu-item">Контакты</div>
                    </div>
                    <button className="headerMenu__price-btn">Прайс-лист<img src={price_list} alt="price list" /></button>
                    
                </div>
            </div>
        </div>
    )
}

export default HeaderMenu