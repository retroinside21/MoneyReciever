import React, { useState } from "react";
import logo from "../../img/logo.png"
import Modals from "../Modals/Modals";
import "./Navigaion.css"

const Navigation = ({ limit}) =>{

    const [modalActive, setModalActive] = useState(false)

    return (
        <nav className="navigation">
            <img src={logo} alt="Logo" />
            <div onClick={()=>setModalActive(true)}  className="reference">Cправка</div>
            <Modals active={modalActive} setActive={setModalActive} limit={limit} />
        </nav>
    )
}

export default Navigation