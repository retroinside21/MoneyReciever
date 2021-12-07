import React, { useState } from "react";
import './CashIssue.css'

const CashIssue = ({addCount}) => {
    const numberArr = ['1','2','3','4','5','6','7','8','9','0','C']
    const [inputValue, setInputValue] = useState('')
    const numberItems = numberArr.map(el=>{
        return <span key={el}  onClick={()=>setInputValue(inputValue + el)}>{el}</span>
    })
    
     const onSubmit = () =>{
        addCount(inputValue)
        setInputValue('')
     }

     if(inputValue.includes('C')){
        setInputValue('')
    }

    return (
        <div className="input-item">
            <input onChange={(e)=>setInputValue(e.target.value)} value={inputValue}  placeholder="Введите сумму" />
            <button  onClick={onSubmit}>Выдать</button>
            <div className="container-numberset">
             {numberItems}
            </div>
        </div>
    )
}

export default CashIssue