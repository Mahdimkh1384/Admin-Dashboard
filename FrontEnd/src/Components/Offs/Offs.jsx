import React from 'react'
import "./Offs.css"
import ErrorBox from '../Error Box/ErrorBox'

export default function Offs() {
    return (
        <div className="cms-main">
            <h1 className='cms-title'>لیست تخفیفات </h1>
            <ErrorBox msg="هیچ کد تخفیفی یافت نشد" />
        </div>
    )
}
