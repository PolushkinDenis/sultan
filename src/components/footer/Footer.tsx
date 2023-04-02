import React, { FC } from "react";
import './Footer.scss'
import logo_footer from '../../images/logo_footer.png'
import price_list from '../../images/price_list.png'
import whatsap from '../../images/whatsap.png'
import telegram from '../../images/telegram.png'
import visa from '../../images/Visa.png'
import mastercard from '../../images/mastercard.png'

const Footer: FC = () => {

    return (
        <footer>
            <div className="footer__content">
                <div className="footer__content-first">
                    <div className="content__first-logo">
                        <img className="first__logo-img" src={logo_footer} alt="logo" />
                        <button className="content__price-btn price_btn-mobile">Прайс-лист<img src={price_list} alt="price list" /></button>
                    </div>
                    <div className="content__first-discription">
                        Компания «Султан» — снабжаем розничные магазины товарами
                        "под ключ" в Кокчетаве и Акмолинской области
                    </div>
                    <div className="content__first-subscribe">
                        <div className="subscribe-text">Подпишись на скидки и акции</div>
                        <div className="header__search">
                            <input className="search-input" type="text" placeholder="Введите ваш E-mail" />
                            <input className="search-button" type="button" />
                        </div>
                    </div>
                </div>
                <div className="footer__content-two">
                    <div className="footer__content-second">
                        <div className="content-second-title">Меню сайта:</div>
                        <div className="content-second-item">О компании</div>
                        <div className="content-second-item">Доставка и оплата</div>
                        <div className="content-second-item">Возврат</div>
                        <div className="content-second-item">Контакты</div>
                    </div>
                    <div className="footer__content-second">
                        <div className="content-second-title">Категории:</div>
                        <div className="content-second-item">Бытовая химия</div>
                        <div className="content-second-item">Косметика и гигиена</div>
                        <div className="content-second-item">Товары для дома</div>
                        <div className="content-second-item">Товары для детей и мам</div>
                        <div className="content-second-item">Посуда</div>
                    </div>
                </div>
                <div className="footer__content-tree">
                    <div className="footer__content-third">
                        <div className="content__third-title">Скачать прайс-лист:</div>
                        <button className="header__price-btn">Прайс-лист<img src={price_list} alt="price list" /></button>
                        <div className="content__third-contact">Связь в мессенджерах:</div>
                        <div className="content__third-contacts">
                            <img className="whatsap" src={whatsap} alt="whatsap" />
                            <img src={telegram} alt="telegram" />
                        </div>
                    </div>
                    <div className="footer__content-fourth">
                        <div className="content__fourth-title">Контакты:</div>
                        <div className="content__fourth-phone">+7 (777) 490-00-91</div>
                        <div className="content__fourth-time">время работы: 9:00-20:00</div>
                        <div className="content__fourth-callback">Заказать звонок</div>
                        <div className="content__fourth-mail">opt.sultan@mail.ru</div>
                        <div className="content__fourth-allTime">На связи в любое время</div>
                        <div>
                            <img src={visa} alt="visa" />
                            <img src={mastercard} alt="mastercard" />
                        </div>
                    </div>
                </div>


            </div>

        </footer>
    )
}

export default Footer