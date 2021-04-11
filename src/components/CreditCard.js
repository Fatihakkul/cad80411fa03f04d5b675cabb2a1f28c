import React from 'react';
import { SiVisa } from "react-icons/si"
import './styles/creditcard.scss';

const CreditCard = (props) => {
    return (
        <div className={`credit-card ${props.back ? "rotate" : ""}`}>
            <div className="credit-card-front">
                <div className='credit-card__logo'>
                    <SiVisa size={40} />
                </div>
                <div className='credit-card__number'>{props.number ? props.number : "XXXXXXXXXXXXXX"}</div>
                <div className='credit-card__info'>
                    <div className='credit-card__info_name'>
                        <div className='credit-card__info_label'>Müşteri Adı Soyadı</div>
                        <div>{props.name ? props.name : "XXXXXX"}</div>
                    </div>

                    <div className='credit-card__info_expiry'>
                        <div className='credit-card__info_label'>VALID THRU</div>
                        <div>{props.expiry}</div>
                    </div>
                </div>
            </div>
            <div className="credit-card-back">
                <div className="black-background" >
                    <SiVisa size={40} />
                </div>
                <div className="back-line"></div>
                <div className='credit-card__info_expiry'>
                    <div className='credit-card__info_label'>CVV</div>
                    <div>{props.cvv ? props.cvv : "XXX"}</div>
                </div>
            </div>
        </div>
    );
}
export { CreditCard }