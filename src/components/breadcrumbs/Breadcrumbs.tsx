import React, { FC } from "react";
import './Breadcrumbs.scss'
import { NavLink } from "react-router-dom";
import separator from "../../images/separator.png"

interface Breadcrumbs {
    link: string,
    name: string,
}

interface BreadcrumbsProps {
    links: Breadcrumbs[]
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ links }) => {

    return (
        <div className="breadcrumbs" data-testid="breadcrumbs-page">
            <NavLink data-testid="back-link" to="/sultan">Главная</NavLink>
            {links.map(link => (
                <div className="breadcrumbs__item" key={link.name}>
                    <img src={separator} />
                    <NavLink to={link.link}>{link.name}</NavLink>
                </div>
            ))}
        </div>
    )
}

export default Breadcrumbs