import "./Header.css"
import { useEffect, useState } from "react"
import { AiOutlineBell } from 'react-icons/ai'
import { BsMoonStars, BsSun } from 'react-icons/bs'
import { IoCloseCircleOutline, IoMenu } from "react-icons/io5";
import DetailsModal from "../DetailsModal/DetailsModal"
import SideBar from "../SideBar/SideBar";

export default function Header() {
    const [searchInput, setSearchInput] = useState("")
    const [isDark, setIsDark] = useState(() => localStorage.getItem("Theme") === "dark")
    const [isShowDetailModal, setIsShowDetailModal] = useState(false)
    const [isShowSearchResult, setIsShowSearchResult] = useState(false)
    const [allProductData, setAllProductData] = useState([])
    const [searchedData, setSearchedData] = useState([])
    const [isShowMenuForPhone, setIsShowMenuForPhone] = useState(false)

    const getAllProductsData = () => {
        fetch("https://backend.mahdi-dev.ir/api/products")
            .then(res => res.json())
            .then(result => setAllProductData(result))
            .catch(() => {})
    }

    useEffect(() => {
        getAllProductsData()
    }, [])

    const applyTheme = (dark) => {
        if (dark) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }

    // Apply saved theme on first mount
    useEffect(() => {
        applyTheme(isDark)
    }, [])

    const changeTheme = () => {
        const nextDark = !isDark
        setIsDark(nextDark)
        localStorage.setItem("Theme", nextDark ? "dark" : "light")
        applyTheme(nextDark)
    }

    const searchProductHandler = (e) => {
        setSearchInput(e.target.value)
        if (e.target.value !== "") {
            setIsShowSearchResult(true)
            let filteredData = allProductData.filter(product =>
                product.title.toLowerCase().includes(e.target.value)
            )
            setSearchedData(filteredData)
        } else {
            setSearchedData([])
            setIsShowSearchResult(false)
        }
    }

    return (
        <>
            <div className="header">
                <div className='admin-profile'>
                    <button className="header-left-icon menuBtn" onClick={() => setIsShowMenuForPhone(p => !p)}>
                        <IoMenu />
                    </button>
                    {isShowMenuForPhone && <SideBar />}
                    <img src="img/userIcon.png" alt="Admin" />
                    <div>
                        <h1>مهدی مرامی</h1>
                        <h3>برنامه نویس فرانت اند</h3>
                    </div>
                </div>
                <div className='header-left-section'>
                    <div className="search-box-container">
                        <div className='search-box'>
                            <input
                                type="text"
                                placeholder='جستجو کنید ...'
                                value={searchInput}
                                onChange={searchProductHandler}
                            />
                            <button onClick={() => { setSearchInput(""); setIsShowSearchResult(false) }}>
                                جستجو
                            </button>
                        </div>
                        <div className={isShowSearchResult ? "search-result-box show" : "search-result-box"}>
                            <div className="search-result-box-header">
                                <h3>نتیجه جستجو</h3>
                                <IoCloseCircleOutline className="closeIcon" onClick={() => setIsShowSearchResult(false)} />
                            </div>
                            <hr />
                            {!searchedData.length && <h2 className="search-result-empty">هیچ چیزی یافت نشد !</h2>}
                            {searchedData.map(product => (
                                <div className="search-result-box-product" key={product.id}>
                                    <img src={product.img} className="result-product-img" alt={product.title} />
                                    <p>{product.title}</p>
                                    <p>{product.price?.toLocaleString("en-US")} تومان</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="notification-logo-box">
                        <button className='header-left-icon' onClick={() => setIsShowDetailModal(true)}>
                            <AiOutlineBell />
                        </button>
                        <span className="notification-count">0</span>
                    </div>
                    <button className="header-left-icon theme-btn" onClick={changeTheme} title={isDark ? "حالت روشن" : "حالت تاریک"}>
                        {isDark ? <BsSun /> : <BsMoonStars />}
                    </button>
                </div>
            </div>
            {isShowDetailModal && (
                <DetailsModal onHide={() => setIsShowDetailModal(false)}>
                    <h1 style={{ color: "red", fontSize: "xx-large" }}>هیچ اعلانی وجود ندارد</h1>
                </DetailsModal>
            )}
        </>
    )
}
