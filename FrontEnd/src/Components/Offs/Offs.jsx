import React, { useEffect, useState } from 'react'
import "./Offs.css"
import ErrorBox from '../Error Box/ErrorBox'
import DeleteModal from '../DeleteModal/DeleteModal'
import Loading from '../Loading/Loading'

export default function Offs() {

    const [allOffs, setAllOffs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowActiveModal, setIsShowActiveModal] = useState(false)
    const [isShowRejectModal, setIsShowRejectModal] = useState(false)
    const [mainOffID, setMainOffID] = useState(null)

    const getAllOffs = () => {
        fetch("https://backend.mahdi-dev.ir/api/offs/")
            .then(res => res.json())
            .then(offs => {
                setAllOffs(offs || [])
                setIsLoading(false)
            })
            .catch(() => setIsLoading(false))
    }

    useEffect(() => {
        getAllOffs()
    }, [])

    const deleteModalCancelAction = () => {
        setIsShowDeleteModal(false)
    }

    const deleteModalSubmitAction = () => {
        fetch(`https://backend.mahdi-dev.ir/api/offs/${mainOffID}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(() => {
                getAllOffs()
                setIsShowDeleteModal(false)
            })
    }

    const activeOffSubmit = () => {
        fetch(`https://backend.mahdi-dev.ir/api/offs/active-off/${mainOffID}/1`, {
            method: "PUT"
        })
            .then(res => res.json())
            .then(() => {
                getAllOffs()
                setIsShowActiveModal(false)
            })
    }

    const rejectOffSubmit = () => {
        fetch(`https://backend.mahdi-dev.ir/api/offs/active-off/${mainOffID}/0`, {
            method: "PUT"
        })
            .then(res => res.json())
            .then(() => {
                getAllOffs()
                setIsShowRejectModal(false)
            })
    }

    return (
        <>
            <div className="cms-main">
                <h1 className='cms-title'>لیست تخفیفات</h1>
                {allOffs.length ? (
                    <table className="cms-table">
                        <thead>
                            <tr>
                                <th>کد تخفیف</th>
                                <th>محصول</th>
                                <th>ادمین</th>
                                <th>درصد تخفیف</th>
                                <th>تاریخ</th>
                                <th>وضعیت</th>
                                <th>عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allOffs.map((off) => (
                                <tr key={off.id}>
                                    <td>
                                        <span className="off-code">{off.code}</span>
                                    </td>
                                    <td>{off.productID}</td>
                                    <td>{off.adminID}</td>
                                    <td>{off.percent}٪</td>
                                    <td>{off.date}</td>
                                    <td>
                                        <span className={`off-status ${off.isActive === 1 ? "off-status--active" : "off-status--inactive"}`}>
                                            {off.isActive === 1 ? "فعال" : "غیرفعال"}
                                        </span>
                                    </td>
                                    <td>
                                        <button onClick={() => {
                                            setIsShowDeleteModal(true)
                                            setMainOffID(off.id)
                                        }}>
                                            حذف
                                        </button>
                                        {off.isActive === 0 ? (
                                            <button onClick={() => {
                                                setIsShowActiveModal(true)
                                                setMainOffID(off.id)
                                            }}>
                                                فعال‌سازی
                                            </button>
                                        ) : (
                                            <button onClick={() => {
                                                setIsShowRejectModal(true)
                                                setMainOffID(off.id)
                                            }}>
                                                غیرفعال
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    !isLoading && <ErrorBox msg="هیچ کد تخفیفی یافت نشد" />
                )}
                {isLoading && <Loading />}
            </div>

            {isShowDeleteModal && (
                <DeleteModal
                    title={"آیا از حذف کد تخفیف اطمینان دارید؟"}
                    cancelAction={deleteModalCancelAction}
                    submit={deleteModalSubmitAction}
                />
            )}
            {isShowActiveModal && (
                <DeleteModal
                    title={"آیا از فعال‌سازی کد تخفیف اطمینان دارید؟"}
                    cancelAction={() => setIsShowActiveModal(false)}
                    submit={activeOffSubmit}
                />
            )}
            {isShowRejectModal && (
                <DeleteModal
                    title={"آیا از غیرفعال کردن کد تخفیف اطمینان دارید؟"}
                    cancelAction={() => setIsShowRejectModal(false)}
                    submit={rejectOffSubmit}
                />
            )}
        </>
    )
}
