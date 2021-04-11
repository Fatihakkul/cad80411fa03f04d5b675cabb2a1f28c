import React from "react"
import {
    Datepicker,
    InputNumber,
    SingleSelect
} from "./index"
import './styles/reservationinput.scss'

const ReservationInput = (props) => {
    return (
        <div className="reservation-container">
            <SingleSelect />
            <div className="infocontent">
                <Datepicker title="Giriş Tarihi" />
                <Datepicker  title="Çıkış Tarihi"/>
                <InputNumber title="Yetişkin Sayısı" />
                <InputNumber title="Çocuk Sayısı" />
            </div>
        </div>

    )
}
export default ReservationInput