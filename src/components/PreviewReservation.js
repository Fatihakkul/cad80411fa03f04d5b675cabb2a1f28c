import React, { useEffect, useState } from "react"
import './styles/preview.scss'
import {
    MyButton
} from "./index"
import { FcApproval } from "react-icons/fc"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { addReservationInfo } from "../actions/user"
import * as actionsTypes from "../types/user"
import * as URL from "../constant/api-urls"

const PreviewReservation = (props) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector((state) => state)

    useEffect(() => {
        checkState()
    }, [])

    const checkState = () => {
        if (state.loading) {
            history.push('/')
        }
    }

    const newReservation = () => {
        localStorage.clear()
        dispatch(addReservationInfo(actionsTypes.DELETE_ALL_STATE, "deletestate"))
        history.push('/')
    }

    const deleteReservation = async () => {
        let response = await axios.delete(URL.baseUrl + URL.reservationEndpoint + `/${state.reservation.id}`)
            .catch((err)=>dispatch(addReservationInfo(actionsTypes.ERROR,{error :true , errorMessage : "Silmek istediğiniz reservasyona ulaşılamıyor. Lütfe daha sonra tekrar deneyiniz "})))
        if (response?.status === 200) {
            localStorage.clear()
            dispatch(addReservationInfo(actionsTypes.DELETE_ALL_STATE, "deletestate"))
            history.push('/')
        }
    }

    const updateReservation = () => {
        dispatch(addReservationInfo(actionsTypes.UPDATE_RESERVATION , true))
        history.push('/')
    }

    return (
        <div className="preview-container">
            { state.loading ? null : <div className="preview-content">
                <div className="preview-header">
                    <FcApproval size={40} />
                    <h3>RESERVASYON KAYDINIZ ALINMIŞTIR </h3>
                    <text>Rezervasyon kaydınız alınmıştır. Rezervasyon kaydınızda değişiklik veya yeni Rezervasyon yapmak için aşağıdaki linkleri kullanabilirsiniz.</text>
                    <div className="preview-buttons">
                        <MyButton title="Yeni Rezervasyon Yap" onClick={newReservation} />
                        <MyButton title="Rezervasyonu Güncelle" onClick={updateReservation} />
                        <a href="#popup1">
                            <text>Rezervasyonu İptal Et</text>
                        </a>
                    </div>
                </div>
                <div className="preview-info">
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
                <div id="popup1" className="overlay">
                    <div className="popup">
                        <h3>Emin misin?</h3>
                        <div className="modal-content">Rezervasyon kaydınızı iptal etmek istediğinize emin misiniz?</div>
                        <div className="modal-button">
                            <a href="#">
                                <text>Vazgeç</text>
                            </a>
                            <MyButton title="Rezervasyonu İptal Et" onClick={deleteReservation} />
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}
export default PreviewReservation