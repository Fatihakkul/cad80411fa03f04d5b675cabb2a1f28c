import * as actionTypes from '../types/user'


const INITIAL_STATE = {
    hotelList: [],
    hotelDeatils: [],
    selectedHotel: {},
    error: false,
    loading: true,
    entryDate: "",
    outDate: "",
    childSize: 0,
    adultSize: 0,
    hotelName: "",
    roomType: "",
    roomScenic: "",
    priceRate: "",
    price: 0,
    discountPrice: "",
    discountCode: [],
    discountCodeEroor: null,
    roomPrice: "",
    discount: "",
    reservation: {},
    coupon_code: "",
    card_name: "",
    card_number: "",
    card_date_month: 0,
    card_date_year: 0,
    card_cvv: 0,
    updateReservation:false,
    errorMessage :""
}


export const reducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.GET_HOTEL_LIST:
            return {
                ...state,
                hotelList: action.payload,
                loading: false
            }
        case actionTypes.GET_HOTEL_DETAIL:
            return {
                ...state,
                hotelDeatils: action.payload,
                loading: false
            }
        case actionTypes.SELECTED_HOTEL:
            return {
                ...state,
                selectedHotel: action.payload,
                loading: false
            }
        case actionTypes.ADD_ADULT_SIZE:
            return {
                ...state,
                adultSize: action.payload,
                loading: false
            }
        case actionTypes.ADD_CHILD_SIZE:
            return {
                ...state,
                childSize: action.payload,
                loading: false
            }
        case actionTypes.ADD_ENTRY_DATE:
            return {
                ...state,
                entryDate: action.payload,
                loading: false
            }
        case actionTypes.ADD_OUT_DATE:
            return {
                ...state,
                outDate: action.payload,
                loading: false
            }
        case actionTypes.ADD_HOTEL_NAME:
            return {
                ...state,
                hotelName: action.payload,
                loading: false
            }
        case actionTypes.ADD_ROOM_TYPE:
            return {
                ...state,
                roomType: action.payload,
                loading: false
            }
        case actionTypes.ADD_ROOM_SCENIC:
            return {
                ...state,
                roomScenic: action.payload,
                loading: false
            }
        case actionTypes.ADD_PRICE:
            return {
                ...state,
                price: action.payload,
                discountPrice: action.payload,
                loading: false
            }
        case actionTypes.ADD_PRICE_RATE:
            return {
                ...state,
                priceRate: action.payload,
                loading: false
            }
        case actionTypes.ADD_DISCOUNT_CODE_LIST:
            return {
                ...state,
                discountCode: action.payload,
                loading: false
            }
        case actionTypes.ADD_CALCULATE_PRICE:
            return {
                ...state,
                discountPrice: action.payload.discountPrice,
                discount: action.payload.discount,
                coupon_code: action.payload.code,
                loading: false
            }
        case actionTypes.ADD_DISCOUNT_CODE_ERROR:
            return {
                ...state,
                discountCodeEroor: action.payload,
                loading: false
            }
        case actionTypes.ADD_ROOM_PRICE:
            return {
                ...state,
                roomPrice: action.payload,
                loading: false
            }
        case actionTypes.UPDATE_RESERVATION:
            return {
                ...state,
                updateReservation:action.payload
            }     
        case actionTypes.ADD_RESERVATION_RESPONSE:
            return {
                ...state,
                reservation: action.payload,
                loading: false
            }
        case actionTypes.ADD_CREDIT_CARD_NAME:
            return {
                ...state,
                card_name: action.payload,
                loading: false
            }
        case actionTypes.ADD_CREDIT_CARD_NUMBER:
            return {
                ...state,
                card_number: action.payload,
                loading: false
            }
        case actionTypes.ADD_CREDIT_CARD_MONTH:
            return {
                ...state,
                card_date_month: action.payload,
                loading: false
            }
        case actionTypes.ADD_CREDIT_CARD_YEAR:
            return {
                ...state,
                card_date_year: action.payload,
                loading: false
            }
        case actionTypes.ADD_CREDIT_CARD_CVV:
            return {
                ...state,
                card_cvv: action.payload,
                loading: false
            }
        case actionTypes.ERROR:
            return {
                ...state,
                error: action.payload.error,
                errorMessage:action.payload.errorMessage
            }
        case actionTypes.DELETE_ALL_STATE:
            return {
                ...INITIAL_STATE,
            }
        default:
            return state;
    }
}