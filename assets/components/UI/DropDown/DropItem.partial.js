import React from 'react'

const DropItem = ({ title, onClick }) => {
    return (
        <div className="dropdown-item" onClick={onClick}>{ title }</div>
    )
}

export default DropItem
