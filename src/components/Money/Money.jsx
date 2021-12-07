import React from "react";
import MoneyItem from "./MoneyItem";
import './Money.css'
import img50 from "../../img/money/50.jpg"
import img100 from "../../img/money/100.jpg"
import img200 from "../../img/money/200.jpg"
import img500 from "../../img/money/500.jpg"
import img1000 from "../../img/money/1000.jpg"
import img2000 from "../../img/money/2000.jpg"
import img5000 from "../../img/money/5000.jpg"

const moneyArr = [
    img50,
    img100,
    img200,
    img500,
    img1000,
    img2000 ,
    img5000
]

const moneyItems = moneyArr.map(el=>{
    return <MoneyItem key={el} srs={el} /> 
})


const Money = () =>{
    return(
        <div className="money-container">
            {moneyItems}
        </div>
    )
}


export default Money