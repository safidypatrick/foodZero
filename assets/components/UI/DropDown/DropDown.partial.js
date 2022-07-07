import React from 'react';
import './Dropdown.styles.scss';
import { BiDotsVertical } from 'react-icons/bi';

const DropDown = ({ children }) => {
    const [show, toggleShow] = React.useState(false);
    const containerRef = React.useRef(null);
    
    React.useEffect(() => {
        document.addEventListener('click', function(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                toggleShow(false);
            }
        })

        return () => {
            document.removeEventListener('click', null);
        }
    }, [])

    return (
        <div ref={containerRef} className="dropdown">
            <div
                className="dropdown-button"
                onClick={() => toggleShow(!show)}>
                <BiDotsVertical />
            </div>

            <div className={`dropdown-menu ${show ? 'visible' : ''}`}>
                { children ? children : null }
            </div>
        </div>
    )
}

export default DropDown
