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
            border: '1px solid #e51e25'
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
                closeTimeoutMS={500}
                contentLabel="Example Modal"
            >
                <div className='p-4'>
                    <h2>{title}</h2>
                    <button onClick={closeModal}>X</button>
                </div>
            </Modal>
        </div>
    );
};

export default ModalAlert;