import React, { useEffect, useState } from 'react'
import "./Orders.css"
import ErrorBox from '../Error Box/ErrorBox'
import DeleteModal from '../DeleteModal/DeleteModal'
import Loading from '../Loading/Loading'

export default function Orders() {

    const [allOrders, setAllOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowActiveModal, setIsShowActiveModal] = useState(false)
    const [isShowRejectModal, setIsShowRejectModal] = useState(false)
    const [mainOrderID, setMainOrderID] = useState(null)

    const getAllOrders = () => {
        fetch("https://backend.mahdi-dev.ir/api/orders/")
            .then(res => res.json())
            .then(orders => {
                setAllOrders(orders || [])
                setIsLoading(false)
            })
            .catch(() => setIsLoading(false))
    }

    useEffect(() => {
        getAllOrders()
    }, [])

    const deleteModalCancelAction = () => {
        setIsShowDeleteModal(false)
    }

    const deleteModalSubmitAction = () => {
        fetch(`https://backend.mahdi-dev.ir/api/orders/${mainOrderID}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(() => {
                getAllOrders()
                setIsShowDeleteModal(false)
            })
    }

    const activeOrderSubmit = () => {
        fetch(`https://backend.mahdi-dev.ir/api/orders/active-order/${mainOrderID}/1`, {
            method: "PUT"
        })
            .then(res => res.json())
            .then(() => {
                getAllOrders()
                setIsShowActiveModal(false)
            })
    }

    const rejectOrderSubmit = () => {
        fetch(`https://backend.mahdi-dev.ir/api/orders/active-order/${mainOrderID}/0`, {
            method: "PUT"
        })
            .then(res => res.json())
            .then(() => {
                getAllOrders()
                setIsShowRejectModal(false)
            })
    }

    return (
        <>
            <div className="cms-main">
                <h1 className='cms-title'>لیست سفارشات</h1>
                {allOrders.length ? (
                    <table className="cms-table">
                        <thead>
                            <tr>
                                <th>کاربر</th>
                                <th>محصول</th>
                                <th>قیمت</th>
                                <th>تاریخ</th>
                                <th>ساعت</th>
                                <th>وضعیت</th>
                                <th>عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allOrders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.userID}</td>
                                    <td>{order.productID}</td>
                                    <td>{order.price ? order.price.toLocaleString("en-US") + " تومان" : "-"}</td>
                                    <td>{order.date}</td>
                                    <td>{order.hour}</td>
                                    <td>
                                        <span className={`order-status ${order.isActive === 1 ? "order-status--active" : "order-status--inactive"}`}>
                                            {order.isActive === 1 ? "تأیید شده" : "در انتظار"}
                                        </span>
                                    </td>
                                    <td>
                                        <button onClick={() => {
                                            setIsShowDeleteModal(true)
                                            setMainOrderID(order.id)
                                        }}>
                                            حذف
                                        </button>
                                        {order.isActive === 0 ? (
                                            <button onClick={() => {
                                                setIsShowActiveModal(true)
                                                setMainOrderID(order.id)
                                            }}>
                                                تأیید
                                            </button>
                                        ) : (
                                            <button onClick={() => {
                                                setIsShowRejectModal(true)
                                                setMainOrderID(order.id)
                                            }}>
                                                رد
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    !isLoading && <ErrorBox msg="هیچ سفارشی یافت نشد" />
                )}
                {isLoading && <Loading />}
            </div>

            {isShowDeleteModal && (
                <DeleteModal
                    title={"آیا از حذف سفارش اطمینان دارید؟"}
                    cancelAction={deleteModalCancelAction}
                    submit={deleteModalSubmitAction}
                />
            )}
            {isShowActiveModal && (
                <DeleteModal
                    title={"آیا از تأیید سفارش اطمینان دارید؟"}
                    cancelAction={() => setIsShowActiveModal(false)}
                    submit={activeOrderSubmit}
                />
            )}
            {isShowRejectModal && (
                <DeleteModal
                    title={"آیا از رد سفارش اطمینان دارید؟"}
                    cancelAction={() => setIsShowRejectModal(false)}
                    submit={rejectOrderSubmit}
                />
            )}
        </>
    )
}
