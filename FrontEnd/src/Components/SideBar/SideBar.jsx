import React, { useEffect, useState } from 'react'
import "./SideBar.css"
import { AiOutlineHome } from 'react-icons/ai'
import { MdProductionQuantityLimits } from 'react-icons/md'
import { BiCommentDetail } from 'react-icons/bi'
import { FiUsers } from 'react-icons/fi'
import { BsBagCheck, BsCurrencyDollar } from 'react-icons/bs'
import { IoCloseCircleOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom'


export default function SideBar() {

    const [isShowMenuForPhone, setIsShowMenuForPhone] = useState(true)

    return (
        <>
            {isShowMenuForPhone && <div className='sidebar'>
                <button className='close-sidebar-menu-icon showCloseBtn' onClick={() => setIsShowMenuForPhone(false)}>بستن</button>
                <h1 className='sidebar-title'>به داشبورد خود خوش آمدید</h1>
                <ul className='sidebar-links '>
                    <NavLink to="/">
                        <AiOutlineHome className='icon' />
                        صفحه اصلی
                    </NavLink>
                    <NavLink to="/products">
                        <MdProductionQuantityLimits className='icon' />
                        محصولات
                    </NavLink>
                    <NavLink to="/comments">
                        <BiCommentDetail className='icon' />
                        کامنت ها
                    </NavLink>
                    <NavLink to="/users">
                        <FiUsers className='icon' />
                        کاربران
                    </NavLink>
                    <NavLink to="/orders">
                        <BsBagCheck className='icon' />
                        سفارشات
                    </NavLink>
                    <NavLink to="/offs">
                        <BsCurrencyDollar className='icon' />
                        تخفیف ها
                    </NavLink>
                </ul>
            </div>}
            
        </>
    )
}
