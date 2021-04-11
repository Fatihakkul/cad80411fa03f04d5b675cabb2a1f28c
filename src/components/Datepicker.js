import React,{useEffect} from "react"
import { DatePicker } from "antd"
import moment from "moment"
import { useDispatch } from "react-redux"
import { addReservationInfo } from "../actions/user"
import * as actionTypes from "../types/user"
import './styles/datepicker.scss'

const Datepicker = (props) => {


    const selectedValue =props.title == "Giriş Tarihi" ? JSON.parse(localStorage.getItem("contentOne"))?.entryDate :JSON.parse(localStorage.getItem("contentOne"))?.outDate
    const dispatch = useDispatch()

    useEffect(()=>{
        if(selectedValue){
            dispatch(addReservationInfo(props.title == "Giriş Tarihi" ? actionTypes.ADD_ENTRY_DATE : actionTypes.ADD_OUT_DATE, selectedValue))
        }
    },[])


    return (
        <div className="datepicker-container">
            <text>{props.title}</text>
            <DatePicker defaultValue={selectedValue != null ? moment(selectedValue, 'YYYY-MM-DD') : null} onChange={(e, t) => dispatch(addReservationInfo(props.title == "Giriş Tarihi" ? actionTypes.ADD_ENTRY_DATE : actionTypes.ADD_OUT_DATE, t))} />
        </div>
    )
}
export { Datepicker }