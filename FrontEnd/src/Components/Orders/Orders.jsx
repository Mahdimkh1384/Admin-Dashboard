import React, { useEffect, useState } from 'react'
import "./Orders.css"
import ErrorBox from '../Error Box/ErrorBox'

export default function Orders() {

    // const [allOrders , setAllOrders] = useState([])

    // const getAllOrders = () => {
    //     fetch("http://localhost:8000/api/orders/")
    //         .then(res => res.json())
    //         .then(orders => setAllOrders(orders))
    // }

    // useEffect(()=> {
    //     getAllOrders()
    // } , [])

    return (
        <>
            <div className="cms-main">
                <h1 className='cms-title'>لیست سفارشات </h1>
                {/* {allOrders.length ? (
                    <table className="cms-table">
                    <thead>
                        <tr>
                            <th>اسم کاربر</th>
                            <th>محصول</th>
                            <th>کامنت</th>
                            <th>تاریخ</th>
                            <th>ساعت</th>
                        </tr>
                    </thead>

                    <tbody>
                        {allOrders.map((order) => (
                            <tr key={order.id}>
                                <td>{comment.userID}</td>
                                <td>{comment.productID}</td>
                                <td>
                                    <button onClick={() => {
                                        setIsShowDetailsModal(true)
                                        setMainCommentBody(comment.body)
                                    }}>
                                        دیدن متن
                                    </button>
                                </td>
                                <td>{comment.date}</td>
                                <td>{comment.hour}</td>
                                <td>
                                    <button onClick={() => {
                                        setIsShowDeleteModal(true)
                                        setMainCommentID(comment.id)
                                    }}>
                                        حذف
                                    </button>
                                    <button onClick={() => {
                                        setIsShowEditModal(true)
                                        setMainCommentBody(comment.body)
                                        setMainCommentID(comment.id)
                                    }}>
                                        ویرایش
                                    </button>
                                    <button>پاسخ</button>
                                    {comment.isAccept === 0 ? <button onClick={() => {
                                        setIsShowAcceptModal(true)
                                        setMainCommentID(comment.id)
                                    }}>
                                        تایید
                                    </button> : <button onClick={() => {
                                        setIsShowRejectModal(true)
                                        setMainCommentID(comment.id)
                                    }}>
                                        رد
                                    </button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                ) : ()} */}
                <ErrorBox msg="هیچ سفارشی یافت نشد" />
            </div>
            
        </>
    )
}
