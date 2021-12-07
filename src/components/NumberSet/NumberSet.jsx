import React from "react";
import "./NumberSet.css"

const numberArr = ['1','2','3','4','5','6','7','8','9','C']


const NumberSet = ({addInput}) =>{
    const numberItems = numberArr.map(el=>{
        return <span key={el}  onClick={(e)=>addInput(e.target.innerText)}>{el}</span>
    })

    return (
        <div className="container-numberset">
            {numberItems}
        </div>
    )
}

export default NumberSet