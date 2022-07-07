import React from 'react'
import { NavLink } from 'react-router-dom'
import './PreFooter.style.scss'

const PreFooter = () => {
    return (
        <div className="prefooter-page">
            <div className="prefooter-wrapper">
                <div className="prefooter-title">Simplify  your reservations <br/> here.</div>
                <div className="prefooter-background">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1439" height="360"><g fill="#FFF0EC" fill-rule="evenodd" opacity=".071" transform="translate(-171 -373)"><rect width="310.431" height="708" x="205" y="410" rx="155.215" transform="scale(1 -1) rotate(-45 -1484.244 0)"/><rect width="310.431" height="708" x="1269" y="7" rx="155.215" transform="scale(1 -1) rotate(-45 552.684 0)"/></g></svg>
                </div>
                <div className="prefooter-button">
                    <div className="prefooter-style">
                        <NavLink  to="/commandes" className="prefooter-text">Reserver </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreFooter
