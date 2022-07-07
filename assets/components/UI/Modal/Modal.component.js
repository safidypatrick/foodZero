import React from 'react';
import './Modal.styles.scss';
import { GrClose } from 'react-icons/gr';

const Modal = ({ title, children, show, toggleModal }) => {

    const handleModal = (value) => {
        if (typeof toggleModal === "function") toggleModal(value);
    }

    const isVisible = () => {
        return show === true;
    }

    return (
        <div className={`modal-hazumi ${ isVisible() ? 'visible' : ''}`}>
            <>
                <div className="modal-wrapper" onClick={() => handleModal(false)}></div>
                <div className="modal-content">
                    <div className="modal-title">
                        { title }
                        <div className="modal-close" onClick={() => handleModal(false)}>
                            <GrClose />
                        </div>
                    </div>
                    <div className="modal-body">
                        { isVisible() ? (<>{ children ? children : (<>No content found</>) }</>) : null }
                    </div>
                </div>
            </>
        </div>
    )
}

export default Modal
