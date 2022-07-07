import React from 'react'

const Header = ({ columns }) => {
    return (
        <>
            <thead>
                <tr>
                    { columns.map(({ label, className, style }, index) => {
                        return (<th
                            key={index}
                            style={style}>
                            { label }
                        </th>)
                    })}
                </tr>
            </thead>  
        </>
    )
}

export default Header
