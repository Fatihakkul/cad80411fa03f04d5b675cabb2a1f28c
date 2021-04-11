import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addReservationInfo, payment, selectedHotel } from "../actions/user"
import { useHistory } from "react-router-dom"
import { MyButton } from "./index"
import * as actionTypes from "../types/user"
import './styles/stepper.scss'

const Stepper = (props) => {


    const histroy = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state)
    const hotelDeatils = useSelector((state) => state.hotelDeatils)
    const [current, setCurrent] = useState(0)


    useEffect(() => {
        getLocalData()
    }, [hotelDeatils])




    const next = () => {
        if (current == 0) {
            if (!state.entryDate || !state.outDate || !state.hotelName || !state.adultSize) {
                dispatch(addReservationInfo(actionTypes.ERROR, { error: true, errorMessage: "Çocuk sayısı dışındaki alanları doldurmanız gerekmekte." }))
            }
            else {
                setCurrent(current + 1);
                dispatch(addReservationInfo(actionTypes.ERROR, { error: false, errorMessage: "" }))
                localStorage
                    .setItem("contentOne", JSON.stringify({ selected_hotel: state.hotelName, entryDate: state.entryDate, outDate: state.outDate, childSize: state.childSize, adultSize: state.adultSize }))
            }

        } else if (current == 1) {
            if (!state.roomType || !state.roomScenic) {
                dispatch(addReservationInfo(actionTypes.ERROR, { error: true, errorMessage: "Oda tipi veya Oda manzarası Seçmek zorunludur" }))
            } else {
                setCurrent(current + 1);
                localStorage
                    .setItem("contentTwo", JSON.stringify({ price: state.price, priceRate: state.priceRate, roomType: state.roomType, roomScenic: state.roomScenic }))
            }
        } else if (current == 2) {
            if (state.card_cvv.length == 3 && state.card_number.length == 16 && state.card_name && state.card_date_year.length == 4 && state.card_date_month) {
                dispatch(payment({
                    "hotel_id": state.selectedHotel.hotel_id,
                    "start_date": state.entryDate,
                    "end_date": state.outDate,
                    "adult": parseInt(state.adultSize),
                    "child": parseInt(state.childSize),
                    "room_type": JSON.parse(state.roomType).id,
                    "room_scenic": JSON.parse(state.roomScenic).id,
                    "price": state.discountPrice,
                    "coupon_code": state.coupon_code,
                    "card_name": state.card_name,
                    "card_number": state.card_number,
                    "card_date_month": state.card_date_month,
                    "card_date_year": state.card_date_year,
                    "card_cvv": state.card_cvv
                }, state.reservation?.id, state.updateReservation))
                histroy.push('/preview')
            } else {
                dispatch(addReservationInfo(actionTypes.ERROR, { error: true, errorMessage: "Kart bilgilerini eksik veya hatalı girdiniz" }))

            }
        }
    };

    const prev = () => {
        setCurrent(current - 1);
    };


    const getLocalData = () => {
        const local_data = { ...localStorage }
        if (local_data.contentOne) {
            let select_hotel = JSON.parse(localStorage.contentOne).selected_hotel
            dispatch(selectedHotel(JSON.parse(select_hotel).id, hotelDeatils))
            dispatch(addReservationInfo(actionTypes.ADD_HOTEL_NAME, select_hotel))
            state.updateReservation ? setCurrent(0) : setCurrent(1)
        }
    }

    return (
        <div className="stepper-container">
            <div className="steps-container" >
                {
                    props.steps?.map((item, index) => (
                        <div key={item.title} className="step-container">
                            <div className="step">
                                <div className={index > current ? "steps" : "step-active"}>
                                    <div>
                                        {item.icon}
                                    </div>

                                </div>
                                {index !== props.steps.length - 1 ? <div className={`steps-line ${index > current - 1 ? "backgroundRed" : "backgroundGreen"}`}></div> : null}
                            </div>
                            <label>{item.title}</label>

                        </div>
                    ))
                }
            </div>
            <div className="mysteps-content">
                {props.steps[current]?.content}
                <div id="popup1" className={`overlay ${state.error ? "target" : null}`}>
                    <div className="popup">
                        <h3>Bütün alanları doldurdunuz mu?</h3>
                        <div className="modal-content">{state.errorMessage}</div>
                        <div className="modal-button">
                            <MyButton title="Kapat" onClick={() => dispatch(addReservationInfo(actionTypes.ERROR, false))} />
                        </div>
                    </div>
                </div>
            </div>
           
            <div className="button-container">
            {
                current > 0 ?
                    <MyButton title="Geri" onClick={() => prev()} />
                    :
                    null
            }
                <MyButton title="ileri" onClick={() => next()} />
            </div>
        </div>
    )
}
export { Stepper }