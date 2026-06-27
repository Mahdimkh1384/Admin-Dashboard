import React, { useEffect, useState } from "react";
import ErrorBox from "../Error Box/ErrorBox";
import DetailsModal from "../DetailsModal/DetailsModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";
import "./Comments.css"
import Loading from "../Loading/Loading";

export default function Comments() {
    const [allComments, setAllComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [isShowAcceptModal, setIsShowAcceptModal] = useState(false)
    const [isShowRejectModal, setIsShowRejectModal] = useState(false)
    const [mainCommentBody, setMainCommentBody] = useState(null)
    const [mainCommentID, setMainCommentID] = useState(null)

    const getAllCommentData = () => {
        fetch("https://backend.mahdi-dev.ir/api/comments")
            .then((res) => res.json())
            .then(comments => {
                setAllComments(comments)
                setIsLoading(false)
            })
            .catch(() => setIsLoading(false))
    }

    useEffect(() => {
        getAllCommentData()
    }, []);

    const cancelDetailsModal = () => setIsShowDetailsModal(false)
    const deleteModalCancelAction = () => setIsShowDeleteModal(false)

    const deleteModalSubmitAction = () => {
        fetch(`https://backend.mahdi-dev.ir/api/comments/${mainCommentID}`, { method: "DELETE" })
            .then(res => res.json())
            .then(() => {
                getAllCommentData()
                setIsShowDeleteModal(false)
            })
    }

    const updateProductInfo = (event) => {
        event.preventDefault()
        fetch(`https://backend.mahdi-dev.ir/api/comments/${mainCommentID}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ body: mainCommentBody })
        })
            .then(res => res.json())
            .then(() => {
                getAllCommentData()
                setIsShowEditModal(false)
            })
    }

    const acceptComment = () => {
        fetch(`https://backend.mahdi-dev.ir/api/comments/accept/${mainCommentID}`, { method: "POST" })
            .then(res => res.json())
            .then(() => {
                getAllCommentData()
                setIsShowAcceptModal(false)
            })
    }

    const RejectComment = () => {
        fetch(`https://backend.mahdi-dev.ir/api/comments/reject/${mainCommentID}`, { method: "POST" })
            .then(res => res.json())
            .then(() => {
                getAllCommentData()
                setIsShowRejectModal(false)
            })
    }

    return (
        <>
            <div className="cms-main">
                <h1 className='cms-title'>لیست کامنت ها</h1>
                {isLoading ? (
                    <Loading />
                ) : allComments.length ? (
                    <table className="cms-table">
                        <thead>
                            <tr>
                                <th>اسم کاربر</th>
                                <th>محصول</th>
                                <th>کامنت</th>
                                <th>تاریخ</th>
                                <th>ساعت</th>
                                <th>عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allComments.map((comment) => (
                                <tr key={comment.id}>
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
                                        {comment.isAccept === 0 ? (
                                            <button onClick={() => {
                                                setIsShowAcceptModal(true)
                                                setMainCommentID(comment.id)
                                            }}>
                                                تایید
                                            </button>
                                        ) : (
                                            <button onClick={() => {
                                                setIsShowRejectModal(true)
                                                setMainCommentID(comment.id)
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
                    <ErrorBox msg="هیچ کامنتی یافت نشد" />
                )}
            </div>

            {isShowDetailsModal && (
                <DetailsModal onHide={cancelDetailsModal}>
                    <p className="text-modal">{mainCommentBody}</p>
                </DetailsModal>
            )}
            {isShowDeleteModal && (
                <DeleteModal title={"آیا از حذف اطمینان دارید ؟"} cancelAction={deleteModalCancelAction} submit={deleteModalSubmitAction} />
            )}
            {isShowEditModal && (
                <EditModal onClose={() => setIsShowEditModal(false)} onSubmit={updateProductInfo}>
                    <textarea value={mainCommentBody} onChange={(e) => setMainCommentBody(e.target.value)} />
                </EditModal>
            )}
            {isShowAcceptModal && (
                <DeleteModal title={"آیا از تایید اطمینان دارید ؟"} cancelAction={() => setIsShowAcceptModal(false)} submit={acceptComment} />
            )}
            {isShowRejectModal && (
                <DeleteModal title={"آیا از رد اطمینان دارید ؟"} cancelAction={() => setIsShowRejectModal(false)} submit={RejectComment} />
            )}
        </>
    );
}
