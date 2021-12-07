import React from "react";
import './Modals.css'


const Modals = ({active, setActive,limit}) =>{

    let limitKeys = Object.keys(limit).map(Number)
    let limitValue = Object.values(limit)
    let limits = []
    for(let i=0;i<=limitValue.length-1;i++){
        let res = 'Купюр номинала ' + limitKeys[i] + ' осталось ' + limitValue[i]
        limits.push(res)
    }

    let balance = limits.map(el =>{
        return <div className='out-number'>{el}</div>
    })

    
    return( 
        <div className={active ? "modal active" : "modal"}onClick={()=>setActive(false)}>
            <div className='modal-container' onClick={e => e.stopPropagation()}> 
                <div>
                    {balance}
                </div>
            </div>
        </div>
    )
}

export default Modals