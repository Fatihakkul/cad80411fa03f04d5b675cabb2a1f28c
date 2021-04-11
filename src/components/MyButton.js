import React from "react"
import './styles/mybutton.scss'


const MyButton =(props)=>{
    return(
        <button type="button" className='button' onClick={props.onClick}>
            <text>{props.title}</text>
        </button>
    )
}
export { MyButton }