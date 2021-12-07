import React from "react"
import './Money.css'

const MoneyItem = ({srs}) => {
    return ( <div>
        <img src={srs} alt="money" className='money-img' />
    </div> )
}

export default MoneyItem;