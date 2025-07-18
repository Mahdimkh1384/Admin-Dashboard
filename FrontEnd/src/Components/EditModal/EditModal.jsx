import React from 'react'
import "./EditModal.css"
import { useEffect } from 'react';

export default function EditModal({ children, onClose, onSubmit }) {

    useEffect(() => {
        const checkKey = (event) => {
            if (event.keyCode === 27) {
                onClose();
            }
        }

        window.addEventListener('keydown', checkKey)
        return () => window.removeEventListener('keydown', checkKey)
    });

    return (
        <div className='modal-parent active'>
            <form className='edit-modal-form'>
                <h1>اطلاعات جدید را وارد نمایید</h1>

                {children}
                <button className='edit-form-submit' onClick={onSubmit}>ثبت اطلاعات جدید</button>
                <button className='text-modal-close-btn' onClick={() => onClose()}>بستن</button>
            </form>
        </div>
    )
}
