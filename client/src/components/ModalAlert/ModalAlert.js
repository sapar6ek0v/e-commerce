import React from 'react';
import Modal from "react-modal";
import './ModalAlert.css'

const ModalAlert = ({modalIsOpen, setIsOpen, title}) => {

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid rgba(0,0,0,0.9)',
            background: `rgba(0,0,0,0.9)`,
            backgroundBlendMode : 'darken'
        },
    };


    function closeModal() {
        setIsOpen(false);
    }


    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                closeTimeoutMS={300}
                contentLabel="Example Modal"
            >
                <div className=' modal-block'>
                    <h2 className='modal-title'>{title}</h2>
                    <button className='close-btn' onClick={closeModal}>X</button>
                </div>
            </Modal>
        </div>
    );
};

export default ModalAlert;