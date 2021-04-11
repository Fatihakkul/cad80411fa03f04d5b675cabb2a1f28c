import React from "react"
import { useSelector,useDispatch } from "react-redux";
import { addReservationInfo, selectedHotel } from "../actions/user";
import * as actionTypes from "../types/user"
import { Select } from 'antd';
import './styles/singleselect.scss'


const { Option } = Select;



const SingleSelect = (props) => {

  const dispatch = useDispatch()
  const hotelList = useSelector((state) => state.hotelList)
  const hotelsDetail = useSelector((state)=>state.hotelDeatils)
  const selected =JSON.parse(localStorage.getItem('contentOne'))?.selected_hotel
  
  function select (e){
    dispatch(selectedHotel(JSON.parse(e).id,hotelsDetail))
    dispatch(addReservationInfo(actionTypes.ADD_HOTEL_NAME , e))
  }


  return (
    <div>
      <Select
        className="singleselect"
        showSearch
        placeholder="Rezervasyon yapmak istediğiniz oteli seçin"
        optionFilterProp="children"
        onChange={(e) =>select(e) }
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        defaultValue={selected!= null ? JSON.parse(selected).hotel_name  : null}
        
      >
        {
          hotelList?.map((item) => (
            <Option key={item.hotel_name} value={JSON.stringify(item)}>{item.hotel_name}</Option>
          ))
        }


      </Select>
    </div>
  )
}

export { SingleSelect }