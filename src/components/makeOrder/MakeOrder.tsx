import React, { FC, ReactElement, useEffect } from "react";
import './MakeOrder.scss'
import makeOrder from '../../images/makeOrder.png'

interface MakeOrder {
    visible: boolean
    onClose: () => void
}

const MakeOrder: FC<MakeOrder> = ({
    visible = false,
    onClose,
}) => {

    const onKeydown = ({ key }: KeyboardEvent) => {
        switch (key) {
            case 'Escape':
                onClose()
                break
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeydown)
        return () => document.removeEventListener('keydown', onKeydown)
    })

    // если компонент невидим, то не отображаем его
    if (!visible) return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-dialog-order" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <span className="modal-close" onClick={onClose}>
                        &times;
                    </span>
                </div>
                <div className="modal-body">
                    <img src={makeOrder} alt="Готово"/>
                    <div className="modal-body_main">Спасибо за заказ</div>
                    <div className="modal-body_secondary">Наш менеджер свяжется с вами в ближайшее время</div>
                </div>
            </div>
        </div>
    )
}

export default MakeOrder
