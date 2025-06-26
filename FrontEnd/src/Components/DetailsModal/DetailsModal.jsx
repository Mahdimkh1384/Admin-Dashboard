import React from 'react'
import "./DetailsModal.css"
import { useEffect } from 'react'

export default function DetailsModal({ onHide , children}) {

    useEffect(() => {
        const checkKey = (event) => {
            if (event.keyCode === 27) {
                onHide();
            }
        }

        window.addEventListener('keydown', checkKey)
        return () => window.removeEventListener('keydown', checkKey)
    });



    return (
        <div className=' modal-parent active'>
            <div className='details-Modal'>
                {children}
            </div>
        </div>
    )
}
