import axios from "axios"
import moment from "moment"
import * as actionTypes from '../types/user'
import * as URL from "../constant/api-urls"

export const addHotelList = () => {
    return dispatch => {
        axios
            .get(URL.baseUrl + URL.hotelList)
            .then((response) => {
                dispatch({ type: actionTypes.GET_HOTEL_LIST, payload: response.data })
            })
            .catch((err) =>dispatch({type : actionTypes.ERROR , payload : {error:true , errorMessage : "Bir hata oluştu daha sonra tekrar deneyiniz"}}))
    }
}

export const getHotelDetail = () => {
    return dispatch => {
        axios
            .get(URL.baseUrl + URL.hotelDetail)
            .then((response) => {
                dispatch({ type:actionTypes.GET_HOTEL_DETAIL, payload: response.data })
            })
            .catch((err) =>dispatch({type : actionTypes.ERROR , payload : {error : true , errorMessage : "Bir hata oluştu daha sonra tekrar deneyiniz"}}))
    }
}

export const selectedHotel = (id, hotelDeatils) => {
    return dispatch => {
        const selectedDetail = hotelDeatils.filter((item, index) => item.hotel_id == id)
        dispatch({ type: actionTypes.SELECTED_HOTEL, payload: selectedDetail[0]})
    }
}

export const addReservationInfo = (type, value) => {
    return dispatch => {
       dispatch({ type, payload: value })
    }
}

export const getDiscountCode = () => {
    return dispatch => {
        axios
            .get(URL.baseUrl+URL.coupons)
            .then((response) => {
                dispatch({ type: actionTypes.ADD_DISCOUNT_CODE_LIST, payload: response.data })
            })
            .catch((err) =>dispatch({type : actionTypes.ERROR , payload : {error : true , errorMessage : "Bir hata oluştu daha sonra tekrar deneyiniz"}}))
    }
}

export const checkCode = (code, codelist,price) => {
    return dispatch => {
        const d = moment().format("YYYY-MM-DD")
        const currentCode = codelist.filter((item) => {
            if (item.code === code) {
                return item
            }
        })[0]
         
        if(currentCode != undefined && moment(currentCode.expiration_at).diff(d, "days") > 0 ){
            const discountPrice = price - (price * currentCode.discount_ammount/100)
            const discount= price -discountPrice
            dispatch({type : actionTypes.ADD_CALCULATE_PRICE , payload :{discountPrice , discount ,code}})
            dispatch({type :actionTypes.ADD_DISCOUNT_CODE_ERROR , payload : false })
        }else {
            dispatch({type :actionTypes.ADD_DISCOUNT_CODE_ERROR , payload : true })
        }
    }
}

export const payment=(obj,id,update)=>{
    return dispatch=>{
        if(update){
            axios
            .put(URL.baseUrl + URL.reservationEndpoint + `/${id}` , obj)
            .then((response)=>{
                if(response.status === 201){
                    dispatch({type : actionTypes.ADD_RESERVATION_RESPONSE , payload : response.data})
                }
            })
            .catch((err) =>dispatch({type : actionTypes.ERROR , payload : {error : true , errorMessage : "Bir hata oluştu daha sonra tekrar deneyiniz"}}))
        }else{
            axios
            .post(URL.baseUrl + URL.reservationEndpoint , obj)
            .then((response)=>{
                if(response.status === 201){
                    dispatch({type : actionTypes.ADD_RESERVATION_RESPONSE , payload : response.data})
                }
            })
            .catch((err) =>dispatch({type : actionTypes.ERROR , payload : {error : true , errorMessage : "Bir hata oluştu daha sonra tekrar deneyiniz"}}))
        }
    }
}

