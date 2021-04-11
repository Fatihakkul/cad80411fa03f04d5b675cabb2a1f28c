import React, { useEffect } from "react"
import { useDispatch } from "react-redux";
import { addHotelList, getHotelDetail } from "../actions/user";
import { BsCreditCard, BsCalendar } from "react-icons/bs"
import { FaBed } from "react-icons/fa"
import ReservationInput from "../components/ReservationInput"
import ChooseRoomContent from "../components/ChooseRoomContent"
import PaymentContent from "../components/PaymentContent"
import { Stepper } from "../components"
import './styles/home.scss';



function Home() {
   
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(addHotelList())
    dispatch(getHotelDetail())
  }, [])

  const steps = [
    {
      title: "Otel Seçimi",
      content: <ReservationInput />,
      icon: <BsCalendar color="white"/>
    },
    {
      title: "Oda Seçimi",
      content:<ChooseRoomContent />,
      icon: <FaBed color="white" />
        
    },
    {
      title: "Ödeme",
      content: <PaymentContent/>,
      icon:<BsCreditCard color="white"/>
    }
  ];

  return (
    <div className="Container">
        <Stepper steps={steps} />
    </div>
  );
}

export default Home;
