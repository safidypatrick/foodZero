import React from 'react';
import './Block.style.scss';

const Block = ({ className, children }) => {
    return (
        <div className={`block-box bg-white px-8 py-8 shadow ${className}`}>
            { children }
        </div>
    )
}

export default Block