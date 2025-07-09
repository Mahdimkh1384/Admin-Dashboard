import React, { use, useEffect, useState } from 'react'
import "./Users.css"
import ErrorBox from '../Error Box/ErrorBox'
import DeleteModal from '../DeleteModal/DeleteModal'
import DetailsModal from '../DetailsModal/DetailsModal'
import EditModal from '../EditModal/EditModal'
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { MdOutlineEmail, MdOutlineLocalPhone, MdOutlineVerifiedUser } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { PiCity } from "react-icons/pi";
import { GrScorecard } from "react-icons/gr";
import Loading from '../Loading/Loading'



export default function Users() {

    const [allUsers, setAllUsers] = useState([])
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [isShowDetailModal, setIsShowDetailModal] = useState(false)
    const [mainUserID, setMainUserID] = useState(null)
    const [mainUserInfos, setMainUserInfos] = useState({})

    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')
    const [newUserName, setNewUserName] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newCity, setNewCity] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newAddress, setNewAddress] = useState('')
    const [newScore, setNewScore] = useState('')
    const [newBuy, setNewBuy] = useState('')

    const [isLoading, setIsLoading] = useState(true)


    const getAllUsersData = () => {
        fetch("https://backend.mahdi-dev.ir/api/users/")
            .then(res => res.json())
            .then(result => {
                setAllUsers(result)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getAllUsersData()
    }, [])

    const deleteModalCancelAction = () => {
        setIsShowDeleteModal(false)
    }

    const deleteModalSubmitAction = () => {

        fetch(`https://backend.mahdi-dev.ir/api/users/${mainUserID}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(result => {
                setAllUsers(result)
                getAllUsersData()
                setIsShowDeleteModal(false)
            })
    }

    const closeEditModal = () => {
        setIsShowEditModal(false)
    }

    const updateUser = (event) => {
        event.preventDefault()
        let usersNewData = {
            firsname: newFirstName,
            lastname: newLastName,
            username: newUserName,
            password: newPassword,
            phone: newPhone,
            city: newCity,
            email: newEmail,
            address: newAddress,
            score: newScore,
            buy: newBuy
        }

        fetch(`https://backend.mahdi-dev.ir/api/users/${mainUserID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usersNewData)
        })
            .then(res => res.json())
            .then(result => {
                setAllUsers(result)
                getAllUsersData()
                setIsShowEditModal(false)
            })
    }

    const cancelDetailsModal = () => {
        setIsShowDetailModal(false)
    }

    return (
        <>
            <div className='cms-main'>
                <h1 className='cms-title'>لیست کاربران</h1>
                {allUsers.length ? (
                    <table className='cms-table'>
                        <thead>
                            <tr>
                                <th>نام و نام خانوادگی</th>
                                <th>یوزرنیم</th>
                                <th>رمز عبور</th>
                                <th>شماره تماس</th>
                                <th>ایمیل</th>
                            </tr>
                        </thead>

                        <tbody>
                            {allUsers.map(user => (
                                <tr key={user.id}>
                                    <td>{user.firsname}  {user.lastname}</td>
                                    <td>{user.username}</td>
                                    <td>{user.password}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button onClick={() => {
                                            setIsShowDeleteModal(true)
                                            setMainUserID(user.id)
                                        }}>
                                            حذف
                                        </button>
                                        <button onClick={() => {
                                            setIsShowDetailModal(true)
                                            setMainUserInfos(user)
                                        }}>
                                            جزییات
                                        </button>
                                        <button onClick={() => {
                                            setIsShowEditModal(true)
                                            setMainUserID(user.id)
                                            setNewFirstName(user.firsname)
                                            setNewLastName(user.lastname)
                                            setNewUserName(user.username)
                                            setNewPassword(user.password)
                                            setNewPhone(user.phone)
                                            setNewCity(user.city)
                                            setNewEmail(user.email)
                                            setNewAddress(user.address)
                                            setNewScore(user.score)
                                            setNewBuy(user.buy)
                                        }}>
                                            ویرایش
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (<ErrorBox msg="هیچ کاربری یافت نشد" />)}
                {isLoading && <Loading/>}
            </div>
            {isShowDeleteModal && <DeleteModal title={"آیا از حذف اطمینان دارید؟"} cancelAction={deleteModalCancelAction} submit={deleteModalSubmitAction} />}
            {isShowEditModal && <EditModal onClose={closeEditModal} onSubmit={updateUser}>
                <div className="edit-user-info-input-group">
                    <span>
                        <FaRegUserCircle />
                    </span>
                    <input type="text"
                        className="edit-user-info-input"
                        placeholder="نام جدید را وارد کنید"
                        value={newFirstName}
                        onChange={(e) => setNewFirstName(e.target.value)}
                    />
                </div>
                <div className="edit-user-info-input-group">
                    <span>
                        <FaRegUserCircle />
                    </span>
                    <input type="text"
                        className="edit-user-info-input"
                        placeholder="نام خانوادگی جدید را وارد کنید"
                        value={newLastName}
                        onChange={(e) => setNewLastName(e.target.value)}
                    />
                </div>
                <div className="edit-user-info-input-group">
                    <span>
                        <MdOutlineVerifiedUser />
                    </span>
                    <input type="text"
                        className="edit-user-info-input"
                        placeholder="نام کاربری جدید را وارد کنید"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                    />
                </div>
                <div className="edit-user-info-input-group">
                    <span>
                        <RiLockPasswordLine />
                    </span>
                    <input type="text"
                        className="edit-user-info-input"
                        placeholder="پسورد جدید را وارد کنید"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="edit-user-info-input-group">
                    <span>
                        <MdOutlineLocalPhone />
                    </span>
                    <input type="text"
                        className="edit-user-info-input"
                        placeholder="شماره تماس جدید را وارد کنید"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                    />
                </div>
                <div className="edit-user-info-input-group">
                    <span>
                        <PiCity />
                    </span>
                    <input type="text"
                        className="edit-user-info-input"
                        placeholder="محل زندگی جدید را وارد کنید"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                    />
                </div>
                <div className="edit-user-info-input-group">
                    <span>
                        <MdOutlineEmail />
                    </span>
                    <input type="text"
                        className="edit-user-info-input"
                        placeholder="ایمیل جدید را وارد کنید"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                </div>
                <div className="edit-user-info-input-group">
                    <span>
                        <PiCity />
                    </span>
                    <textarea type="text" style={{ maxHeight: "100px" }}
                        className="edit-user-info-input"
                        placeholder="آدرس جدید را وارد کنید"
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                    />
                </div>
                <div className="edit-user-info-input-group">
                    <span>
                        <GrScorecard />
                    </span>
                    <input type="text"
                        className="edit-user-info-input"
                        placeholder="امتیاز جدید را وارد کنید"
                        value={newScore}
                        onChange={(e) => setNewScore(e.target.value)}
                    />
                </div>
                <div className="edit-user-info-input-group">
                    <span>
                        <AiOutlineDollarCircle />
                    </span>
                    <input type="text"
                        className="edit-user-info-input"
                        placeholder="میزان خرید جدید را وارد کنید"
                        value={newBuy}
                        onChange={(e) => setNewBuy(e.target.value)}
                    />
                </div>
            </EditModal>}
            {isShowDetailModal && <DetailsModal onHide={cancelDetailsModal}>
                <table className='cms-table'>
                    <thead>
                        <tr>
                            <th>شهر</th>
                            <th>آدرس</th>
                            <th>امتیاز</th>
                            <th>میزان خرید</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{mainUserInfos.city}</td>
                            <td>{mainUserInfos.address}</td>
                            <td>{mainUserInfos.score}</td>
                            <td>{mainUserInfos.buy.toLocaleString("en-US")} تومان</td>
                        </tr>
                    </tbody>
                </table>
            </DetailsModal>}
        </>
    )
}
