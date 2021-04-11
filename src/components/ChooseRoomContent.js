import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import { addReservationInfo } from "../actions/user"
import * as actionTypes from '../types/user'
import './styles/chooseroom.scss'



const ChooseRoom = (props) => {


    const dispatch = useDispatch()
    const selectedHotel = useSelector((state) => state.selectedHotel)
    const hotelName = useSelector((state) => state.hotelName)
    const entryDate = useSelector((state) => state.entryDate)
    const outDate = useSelector((state) => state.outDate)
    const adultSize = useSelector((state) => state.adultSize)
    const childSize = useSelector((state) => state.childSize)
    const local_data = { ...localStorage }

    useEffect(() => {
        if (local_data?.contentTwo) {
            setTimeout(() => {
                select(JSON.parse(JSON.parse(local_data.contentTwo).roomType), "room-detail")
                select(JSON.parse(JSON.parse(local_data.contentTwo).roomScenic), "room-scenic")
            }, 700);
        }
    }, [])


    function changeColor(coll) {
        for (var i = 0, len = coll.length; i < len; i++) {
            coll[i].style["border"] = `1px solid rgb(219,219,219)`;
        }
    }

    function select(e, className) {
        if (className === "room-detail") {
            dispatch(addReservationInfo(actionTypes.ADD_ROOM_PRICE, e.price))
            dispatch(addReservationInfo(actionTypes.ADD_PRICE, e.price * (parseInt(adultSize) + parseInt(childSize))))
            dispatch(addReservationInfo(actionTypes.ADD_ROOM_TYPE, JSON.stringify(e)))
        } else {
            dispatch(addReservationInfo(actionTypes.ADD_PRICE_RATE, e.price_rate))
            dispatch(addReservationInfo(actionTypes.ADD_ROOM_SCENIC, JSON.stringify(e)))
        }
        const unt = document.getElementsByClassName(className)
        changeColor(unt, "blue")
        const element = document.getElementById(e.title)
        element.style.borderColor = "rgb(0,255,127)"
    }

    return (
        <div className="chooseroom-container">
            <div className="chooseroom-header">
                <text>{`${JSON.parse(hotelName).hotel_name} (${selectedHotel?.city})`}</text>
                <div className="reservation-info">
                    <text>{`Giriş Tarihi: ${entryDate}`}</text>
                    <text>{`Çıkış Tarihi: ${outDate}`}</text>
                    <text>{`Yetişkin Sayısı: ${adultSize}`}</text>
                    <text>{`Çocuk Sayısı: ${childSize}`}</text>
                </div>
            </div>
            <div className="room-detail-content" >
                <text>Oda Tipi Seçimi</text>

                <div className="room-type">

                    {
                        selectedHotel?.room_type.map((item) => (
                            <div key={item.title} id={item.title} className="room-detail" onClick={() => select(item, "room-detail")}>
                                <text>{item.title}</text>
                                <img src={item.photo} />
                                <div className="room-price-container">

                                    <div className="room-price">
                                        <text>{`${moment(outDate).diff(moment(entryDate), "days")}  Gün`}</text>
                                        <text>{`${adultSize} Yetişkin`}</text>
                                    </div>
                                    <text>{`${item.price * (parseInt(adultSize) + parseInt(childSize))} TL`}</text>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
            <div className="room-detail-content">
                <text>Manzara Seçimi</text>
                <div className="room-type">

                    {
                        selectedHotel?.room_scenic.map((item) => (
                            <div key={item.title} id={item.title} className="room-scenic" onClick={() => select(item, "room-scenic")}  >
                                <text>{item.title}</text>
                                <img src={item.photo} />
                                <div className="room-price-container">
                                    <text>Fiyata Etki oranı</text>
                                    <text>{`+${item.price_rate}%`}</text>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div >
    )
}

export default ChooseRoom