import "./Header.css"
import { useEffect, useState } from "react"
import { AiOutlineBell } from 'react-icons/ai'
import { BsBrightnessHigh } from 'react-icons/bs'
import { IoCloseCircleOutline , IoMenu } from "react-icons/io5";
import DetailsModal from "../DetailsModal/DetailsModal"
import SideBar from "../SideBar/SideBar";
import Loading from "../Loading/Loading";


export default function Header() {
    const [searchInput, setSearchInput] = useState("")
    const [theme, setTheme] = useState("light")
    const [isShowDetailModal, setIsShowDetailModal] = useState(false)
    const [isShowSearchResult, setIsShowSearchResult] = useState(false)
    const [allProductData, setAllProductData] = useState([])
    const [searchedData, setSearchedData] = useState([])
    const [isShowMenuForPhone , setIsShowMenuForPhone] = useState(false)

    const getAllProductsData = () => {
        fetch("https://backend.mahdi-dev.ir/api/products")
            .then(res => res.json())
            .then(result => setAllProductData(result))
    }

    useEffect(() => {
        getAllProductsData()
    }, [])

    const changeTheme = () => {
        if(theme=== "light"){
            setTheme("dark")
            localStorage.setItem("Theme", theme)
        }else{
            setTheme("light")
            localStorage.setItem("Theme", theme)
        }
        
        let ThemeStatus = localStorage.getItem("Theme")

        if (ThemeStatus === "dark") {
            document.documentElement.style.setProperty("--white", "rgb(167, 165, 165)")
            document.documentElement.style.setProperty("--blue", "black")
        } else {
            document.documentElement.style.setProperty("--white", "#ffffff")
            document.documentElement.style.setProperty("--blue", "#471AAA")
        }
    }

    window.addEventListener("load", () => {
        let isDarkTheme = localStorage.getItem("darkTheme")

        if (isDarkTheme == "true") {
            document.documentElement.style.setProperty("--white", "rgb(167, 165, 165)")
            document.documentElement.style.setProperty("--blue", "black")
        } else {
            document.documentElement.style.setProperty("--white", "#ffffff")
            document.documentElement.style.setProperty("--blue", "#471AAA")
        }
    })

    const cancelDetailModal = () => {
        setIsShowDetailModal(false)
    }

    const searchProductHandler = (e) => {
        setSearchInput(e.target.value)
        if (e.target.value != "") {
            setIsShowSearchResult(true)
            let filteredData = allProductData.filter(product => {
                return product.title.toLowerCase().includes(e.target.value)
            })

            setSearchedData(filteredData)
        } else {
            setSearchedData([])
            setIsShowSearchResult(false)
        }
    }

    const showMenuHandler = () =>{
        setIsShowMenuForPhone(prev => !prev)
    }

    return (
        <>
            <div className="header">
                <div className='admin-profile'>
                    <button className="header-left-icon menuBtn " onClick={showMenuHandler}><IoMenu /></button>
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
                            <input type="text" placeholder='جستجو کنید ...' value={searchInput} onChange={(e) => searchProductHandler(e)} />
                            <button onClick={() => {
                                setSearchInput("")
                                setIsShowSearchResult(false)
                            }}>
                                جستجو
                            </button>
                        </div>
                        <div className={isShowSearchResult ? "search-result-box show" : "search-result-box "}>
                            <div className="search-result-box-header">
                                <h3>نتیجه جستجو</h3>
                                <IoCloseCircleOutline className="closeIcon" onClick={() => setIsShowSearchResult(false)}/>
                            </div>
                            <hr />
                            {!searchedData.length && <h2 className="search-result-empty">هیچ چیزی یافت نشد !</h2>}
                            {searchedData.map(product => (
                                <div className="search-result-box-product" key={product.id}>
                                    <img src={product.img} className="result-product-img" />
                                    <p> {product.title}</p>
                                    <p>{product.price} تومان</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="notification-logo-box">
                        <button className='header-left-icon' onClick={() => setIsShowDetailModal(true)}><AiOutlineBell /></button>
                        <span className="notification-count">0</span>
                    </div>
                    <button className='header-left-icon' onClick={changeTheme}><BsBrightnessHigh /></button>
                </div>
            </div>
            {isShowDetailModal && <DetailsModal onHide={cancelDetailModal}>
                <h1 style={{ color: "red", fontSize: "xx-large" }}>هیچ اعلانی وجود ندارد</h1>
                <button className="text-modal-close-btn" onClick={() => setIsShowDetailModal(false)}> بستن</button>
            </DetailsModal>}
        </>
    )
}
