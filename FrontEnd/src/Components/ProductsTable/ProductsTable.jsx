import React, { useEffect, useState } from 'react'
import "./ProductsTable.css";
import DeleteModal from '../DeleteModal/DeleteModal';
import DetailsModal from '../DetailsModal/DetailsModal';
import EditModal from '../EditModal/EditModal';
import { AiOutlineDollarCircle , AiFillPicture } from 'react-icons/ai';
import ErrorBox from '../Error Box/ErrorBox';
import { MdOutlineSubtitles , MdOutlinePointOfSale } from "react-icons/md";
import { TbListNumbers , TbChartBarPopular } from "react-icons/tb";
import { IoIosColorPalette } from "react-icons/io";
import Loading from '../Loading/Loading';

export default function ProductsTable({allProducts , getAllProducts, setAllProducts , isLoading}) {

    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [productID, setProductID] = useState(null)
    const [moreProductsData, setMoreProductsData] = useState({})

    const [productNewTitle, setProductNewTitle] = useState("");
    const [productNewPrice, setProductNewPrice] = useState("");
    const [productNewCount, setProductNewCount] = useState("");
    const [productNewImg, setProductNewImg] = useState("");
    const [productNewPopularity, setProductNewPopularity] = useState("");
    const [productNewSale, setProductNewSale] = useState("");
    const [productNewColors, setProductNewColors] = useState("");


    useEffect(() => {
        getAllProducts()
    }, [])


    const deleteModalCancelAction = () => {
        setIsShowDeleteModal(false)
    }

    const deleteModalSubmitAction = () => {
        fetch(`https://backend.mahdi-dev.ir/api/products/${productID}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(result => {
                setAllProducts(result)
                getAllProducts()
                setIsShowDeleteModal(false)
            })

    }

    const cancelDetailsModal = () => {
        setIsShowDetailsModal(false)
    }

    const updateProductInfo = (event) => {
        event.preventDefault()

        let productNewInformation = {
            title: productNewTitle,
            price: productNewPrice,
            count: productNewCount,
            img: productNewImg,
            popularity: productNewPopularity,
            sale: productNewSale,
            colors: productNewColors
        }
        fetch(`https://backend.mahdi-dev.ir/api/products/${productID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productNewInformation)
        })
            .then(res => res.json())
            .then(result => {
                setAllProducts(result)
                getAllProducts()
                setIsShowEditModal(false)
            })
    }


    return (
        <>
            {allProducts.length ? (<table className='products-table'>
                <thead>
                    <tr className='products-table-heading-tr'>
                        <th>عکس</th>
                        <th>اسم</th>
                        <th>قیمت</th>
                        <th>موجودی</th>
                    </tr>
                </thead>

                <tbody>
                    {allProducts.map(product => (
                        <tr className='products-table-tr' key={product.id}>
                            <td>
                                <img src={product.img} className='products-table-img' />
                            </td>
                            <td>{product.title}</td>
                            <td>{product.price.toLocaleString("en-US")}  تومان </td>
                            <td>{product.count}</td>
                            <td className='btns-container'>
                                <button className='products-table-btn' onClick={() => {
                                    setIsShowDetailsModal(true)
                                    setMoreProductsData(product)
                                }}>
                                    جزییات
                                </button>
                                <button className='products-table-btn' onClick={() => {
                                    setIsShowDeleteModal(true)
                                    setProductID(product.id)
                                }}>
                                    حذف
                                </button>
                                <button className='products-table-btn' onClick={() => {
                                    setIsShowEditModal(true)
                                    setProductID(product.id)
                                    setProductNewTitle(product.title)
                                    setProductNewPrice(product.price)
                                    setProductNewCount(product.count)
                                    setProductNewImg(product.img)
                                    setProductNewPopularity(product.popularity)
                                    setProductNewSale(product.sale)
                                    setProductNewColors(product.colors)
                                }}>
                                    ویرایش
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>)
                : (<ErrorBox msg="هیچ محصولی یافت نشد" />)}
                {isLoading && <Loading/>}
                

            {isShowDeleteModal && <DeleteModal title={"آیا از حذف اطمینان دارید ؟"} cancelAction={deleteModalCancelAction} submit={deleteModalSubmitAction} />}
            {isShowDetailsModal && <DetailsModal onHide={cancelDetailsModal} >
                <table className='cms-table'>
                    <thead>
                        <tr>
                            <th>محبوبیت</th>
                            <th>فروش</th>
                            <th>رنگ بندی</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{moreProductsData.popularity} %</td>
                            <td>{moreProductsData.sale.toLocaleString("en-US")} تومان </td>
                            <td>{moreProductsData.colors}</td>
                        </tr>
                    </tbody>
                </table>
            </DetailsModal>}
            {isShowEditModal && <EditModal onClose={() => setIsShowEditModal(false)} onSubmit={updateProductInfo}>
                <div className='edit-products-form-group'>
                    <span>
                        <MdOutlineSubtitles />
                    </span>
                    <input type="text"
                        placeholder='عنوان جدید را وارد کنید'
                        className='edit-product-input'
                        value={productNewTitle}
                        onChange={(e) => setProductNewTitle(e.target.value)}
                    />
                </div>
                <div className='edit-products-form-group'>
                    <span>
                        <AiOutlineDollarCircle />
                    </span>
                    <input type="text"
                        placeholder='قیمت جدید را وارد کنید'
                        className='edit-product-input'
                        value={productNewPrice}
                        onChange={(e) => setProductNewPrice(e.target.value)}
                    />
                </div>
                <div className='edit-products-form-group'>
                    <span>
                        <TbListNumbers />
                    </span>
                    <input type="text"
                        placeholder='موجودی جدید را وارد کنید'
                        className='edit-product-input'
                        value={productNewCount}
                        onChange={(e) => setProductNewCount(e.target.value)}
                    />
                </div>
                <div className='edit-products-form-group'>
                    <span>
                        <AiFillPicture />
                    </span>
                    <input type="text"
                        placeholder='آدرس کاور جدید را وارد کنید'
                        className='edit-product-input'
                        value={productNewImg}
                        onChange={(e) => setProductNewImg(e.target.value)}
                    />
                </div>
                <div className='edit-products-form-group'>
                    <span>
                        <TbChartBarPopular />
                    </span>
                    <input type="text"
                        placeholder='محبوبیت جدید را وارد کنید'
                        className='edit-product-input'
                        value={productNewPopularity}
                        onChange={(e) => setProductNewPopularity(e.target.value)}
                    />
                </div>
                <div className='edit-products-form-group'>
                    <span>
                        <MdOutlinePointOfSale />
                    </span>
                    <input type="text"
                        placeholder='میزان فروش جدید را وارد کنید'
                        className='edit-product-input'
                        value={productNewSale}
                        onChange={(e) => setProductNewSale(e.target.value)}
                    />
                </div>
                <div className='edit-products-form-group'>
                    <span>
                        <IoIosColorPalette />
                    </span>
                    <input type="text"
                        placeholder='تعداد رنگ بندی جدید را وارد کنید'
                        className='edit-product-input'
                        value={productNewColors}
                        onChange={(e) => setProductNewColors(e.target.value)}
                    />
                </div>
            </EditModal>}
        </>
    )
}
