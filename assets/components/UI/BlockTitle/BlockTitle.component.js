import React from 'react'

const BlockTitle = ({ title, description }) => {
    return (
        <div className="mb-2">
            <div className="flex mb-1">
                <div className="text-lg font-bold border-b text-gray-600">{ title }</div>
            </div>
            { description ? (<div className="text-gray-500">{ description }</div>) : null }
            
        </div>
    )
}

export default BlockTitle
