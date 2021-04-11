import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addReservationInfo, checkCode, getDiscountCode } from "../actions/user"
import * as actionTypes from "../types/user"
import moment from "moment"
import { MyButton, CreditCard } from "./index"
import './styles/paymentcontent.scss'


const PaymentContent = (props) => {
    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    const [discountCode, setDiscountCode] = useState("")
    const [creditBack, setCreditBack] = useState(false)

    useEffect(() => {
        dispatch(getDiscountCode())
        dispatch(addReservationInfo(actionTypes.ADD_PRICE, state.price + (state.price * (state.priceRate / 100))))
    }, [])

    const checkTheCode = () => {
        dispatch(checkCode(discountCode, state.discountCode, state.price))
    }

    return (
        <div className="payment-content-container">
            <div className="credit-card-container">
                <div className="credit-card-view">
                    <CreditCard
                        name={state.card_name}
                        number={state.card_number}
                        expiry={`${state.card_date_month}/${state.card_date_year}`}
                        back={creditBack}
                        cvv={state.card_cvv}
                    />
                </div>
                <div className="user-credit-card-info">
                    <div className="form-group">
                        <label>Kart üzerindeki İsim</label>
                        <input
                            id="username"
                            value={state.card_name}
                            onChange={(e) => [dispatch(addReservationInfo(actionTypes.ADD_CREDIT_CARD_NAME, e.target.value)), setCreditBack(false)]}
                            placeholder="Kart üzerindeki isim"
                        />
                    </div>
                    <div className="form-group">
                        <label> Kart üzerindeki numara:</label>
                        <input
                            id="carNumber"
                            value={state.card_number}
                            onChange={(e) => [dispatch(addReservationInfo(actionTypes.ADD_CREDIT_CARD_NUMBER, e.target.value)), setCreditBack(false)]}
                            placeholder="Kart üzerindeki Numara"
                            maxLength={16}
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-column">
                            <label> Kart Son Kullanma Tarihi</label>
                            <div className="form-row">

                                <select
                                    id="month"
                                    onChange={(e) => [dispatch(addReservationInfo(actionTypes.ADD_CREDIT_CARD_MONTH, e.target.value)), setCreditBack(false)]}
                                    value={state.card_date_month}
                                >
                                    {Array.from({ length: 12 }, (_, index) => index + 1).map((item) => (
                                        <option key={item} value={item}>{item}</option>
                                    ))
                                    }

                                </select>
                                <select
                                    id="year"
                                    onChange={(e) => [dispatch(addReservationInfo(actionTypes.ADD_CREDIT_CARD_YEAR, e.target.value)), setCreditBack(false)]}
                                    value={state.card_date_year}

                                >
                                    {Array.from({ length: 12 }, (_, index) => index + moment().year()).map((item) => (
                                        <option key={item} value={item}>{item}</option>
                                    ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-column-cvv">
                            <label>CVV</label>
                            <input
                                id="cvv"
                                placeholder="CVV"
                                value={state.card_cvv}
                                onChange={(e) => [dispatch(addReservationInfo(actionTypes.ADD_CREDIT_CARD_CVV, e.target.value)), setCreditBack(true)]}
                            />
                        </div>

                    </div>
                </div>
            </div>
            <div className="price-info-container">
                <div>
                    <h3>{JSON.parse(state.hotelName)?.hotel_name}</h3>
                </div>
                <div className="horizontal-div">
                    <div className="horizontal-div-info">
                        <text>Giriş Tarihi</text>
                        <text>{state.entryDate}</text>
                    </div>
                    <div className="horizontal-div-info">
                        <text>Çıkış Tarihi</text>
                        <text>{state.outDate}</text>
                    </div>
                </div>
                <div className="horizontal-div">
                    <div className="horizontal-div-info">
                        <text>Yetişkin</text>
                        <text>{state.adultSize}</text>
                    </div>
                    <div className="horizontal-div-info">
                        <text>Çocuk</text>
                        <text>{state.childSize}</text>
                    </div>
                </div>
                <div className="horizontal-div">
                    <div className="horizontal-div-info">
                        <text>Oda Tipi</text>
                        <text>{JSON.parse(state.roomType).title}</text>
                    </div>
                    <div className="horizontal-div-info">
                        <text>Manzara</text>
                        <text>{JSON.parse(state.roomScenic).title}</text>
                    </div>
                </div>
                <div className="horizontal-div-code">
                    <input value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} />
                    <MyButton title="Kodu Kullan" onClick={checkTheCode} />
                </div>
                {
                    state.discountCodeEroor != null && state.discountCodeEroor ? <text>Girdiğiniz Kod Geçersiz</text> : null
                }
                <div className="price-detail-container">
                    <div className="horizontal-div-price-detail">
                        <text>ODA FİYATI</text>
                        <text>{`${state.roomPrice} TL`}</text>
                    </div>
                    <div className="horizontal-div-price-detail">
                        <text>FİYAT ETKİ ORANI</text>
                        <text>{`${state.priceRate} %`}</text>
                    </div>
                    <div className="horizontal-div-price-detail">
                        <text>KONAKLAMA</text>
                        <text>{`${Number(state.price).toFixed(2)} TL`}</text>
                    </div>
                    <div className="horizontal-div-price-detail">
                        <text>İNDİRİM</text>
                        <text>{`-${Number(state.discount).toFixed(2)} TL`}</text>
                    </div>
                    <hr />
                    <div className="total-price">
                        <text>Toplam Tutar</text>
                        <text>{`${Number(state.discountPrice).toFixed(2)} TL`}</text>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default PaymentContent