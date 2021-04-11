import React, { useEffect } from "react"
import { useSelector , useDispatch } from "react-redux"
import { addReservationInfo } from "../actions/user"
import './styles/inputnumber.scss'
import * as actionTypes from "../types/user"


const InputNumber = (props) => {
    
    const dispatch = useDispatch()
    const state = useSelector((state)=>state)
    const selectedHotel = useSelector((state) => state.selectedHotel)
    const loading = useSelector((state) => state.loading)
    const selectedValue =props.title == "Yetişkin Sayısı" ? JSON.parse(localStorage.getItem("contentOne"))?.adultSize : JSON.parse(localStorage.getItem("contentOne"))?.childSize
    
    useEffect(()=>{
        if(selectedValue && props.title == "Yetişkin Sayısı" ){
            dispatch(addReservationInfo(actionTypes.ADD_ADULT_SIZE ,selectedValue ))
        }else if (selectedHotel?.child_status){
            dispatch(addReservationInfo(actionTypes.ADD_CHILD_SIZE ,selectedValue != undefined ? selectedValue : "0" ))
        }else {
           dispatch(addReservationInfo(actionTypes.ADD_CHILD_SIZE  ,"0" ))
        }
    },[selectedHotel])

    const saveSıze =(e)=>{
        if(props.title == "Yetişkin Sayısı" ){
            dispatch(addReservationInfo(actionTypes.ADD_ADULT_SIZE ,e.target.value ))
        }else if (selectedHotel?.child_status){
            dispatch(addReservationInfo(actionTypes.ADD_CHILD_SIZE ,e.target.value ))
        }else{
            dispatch(addReservationInfo(actionTypes.ADD_CHILD_SIZE  ,e.target.value ))
        }
    }

    return (
        <div className="inputnumber-container">
            <text>{props.title}</text>
            {loading ? null :
                <input
                    disabled={props.title === "Çocuk Sayısı" ? !selectedHotel?.child_status : false}
                    className="input"
                    type="number"
                    min="0"
                    defaultValue={selectedValue ? selectedValue : "0"}
                    max={props.title === "Çocuk Sayısı" ?  "5"  : selectedHotel?.max_adult_size} 
                    onChange={saveSıze}
                    style={{ color: "black" }}
                    value={props.title === "Çocuk Sayısı" ? state.childSize : state.adultSize}
                />
            
            }
            {
              props.title === "Çocuk Sayısı" && !selectedHotel?.child_status ? <text>*Çocuk kabul edilmiyor</text> : null
            }
        </div>
    )
}

export { InputNumber }
