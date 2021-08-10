import React from 'react'
import '../css/WelCome.css'
function WelCome({ text }) {
    return (
        <div className="welCome">
            <p className="welCome__text">{text}</p>
        </div>
    )
}

export default WelCome
