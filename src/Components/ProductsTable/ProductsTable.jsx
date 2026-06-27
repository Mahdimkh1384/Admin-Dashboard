import React, { useEffect, useState } from 'react'
import "./ProductsTable.css";
import DeleteModal from '../DeleteModal/DeleteModal';
import DetailsModal from '../DetailsModal/DetailsModal';
import EditModal from '../EditModal/EditModal';
import { AiOutlineDollarCircle, AiFillPicture } from 'react-icons/ai';
import ErrorBox from '../Error Box/ErrorBox';
import { MdOutlineSubtitles, MdOutlinePointOfSale } from "react-icons/md";
import { TbListNumbers, TbChartBarPopular } from "react-icons/tb";
import { IoIosColorPalette } from "react-icons/io";
import Loading from '../Loading/Loading';

export default function ProductsTable({ allProducts, getAllProducts, setAllProducts, isLoading }) {

    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [productID, setProductID] = useState(null)
    const [moreProductsData, setMoreProductsData] = useState({})

    const [productNewTitle, setProductNewTitle] = useState("")
    const [productNewPrice, setProductNewPrice] = useState("")
    const [productNewCount, setProductNewCount] = useState("")
    const [productNewImg, setProductNewImg] = useState("")
    const [productNewPopularity, setProductNewPopularity] = useState("")
    const [productNewSale, setProductNewSale] = useState("")
    const [productNewColors, setProductNewColors] = useState("")

    useEffect(() => {
        getAllProducts()
    }, [])

    const deleteModalSubmitAction = () => {
        fetch(`https://backend.mahdi-dev.ir/api/products/${productID}`, { method: "DELETE" })
            .then(res => res.json())
            .then(() => {
                getAllProducts()
                setIsShowDeleteModal(false)
            })
    }

    const updateProductInfo = (event) => {
        event.preventDefault()
        fetch(`https://backend.mahdi-dev.ir/api/products/${productID}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: productNewTitle,
                price: productNewPrice,
                count: productNewCount,
                img: productNewImg,
                popularity: productNewPopularity,
                sale: productNewSale,
                colors: productNewColors
            })
        })
            .then(res => res.json())
            .then(() => {
                getAllProducts()
                setIsShowEditModal(false)
            })
    }

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : allProducts.length ? (
                <table className='products-table'>
                    <colgroup>
                        <col />{/* عکس */}
                        <col />{/* اسم */}
                        <col />{/* قیمت */}
                        <col />{/* موجودی */}
                        <col />{/* عملیات */}
                    </colgroup>
                    <thead>
                        <tr>
                            <th>عکس</th>
                            <th>اسم</th>
                            <th>قیمت</th>
                            <th>موجودی</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProducts.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <img src={product.img} className='products-table-img' alt={product.title} />
                                </td>
                                <td>{product.title}</td>
                                <td>{product.price.toLocaleString("en-US")} تومان</td>
                                <td>{product.count}</td>
                                <td>
                                    <div className='btns-container'>
                                        <button className='products-table-btn' onClick={() => {
                                            setIsShowDetailsModal(true)
                                            setMoreProductsData(product)
                                        }}>جزییات</button>
                                        <button className='products-table-btn' onClick={() => {
                                            setIsShowDeleteModal(true)
                                            setProductID(product.id)
                                        }}>حذف</button>
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
                                        }}>ویرایش</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <ErrorBox msg="هیچ محصولی یافت نشد" />
            )}

            {isShowDeleteModal && (
                <DeleteModal
                    title={"آیا از حذف اطمینان دارید ؟"}
                    cancelAction={() => setIsShowDeleteModal(false)}
                    submit={deleteModalSubmitAction}
                />
            )}

            {isShowDetailsModal && (
                <DetailsModal onHide={() => setIsShowDetailsModal(false)}>
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
                                <td>{moreProductsData.popularity}٪</td>
                                <td>{moreProductsData.sale?.toLocaleString("en-US")} تومان</td>
                                <td>{moreProductsData.colors}</td>
                            </tr>
                        </tbody>
                    </table>
                </DetailsModal>
            )}

            {isShowEditModal && (
                <EditModal onClose={() => setIsShowEditModal(false)} onSubmit={updateProductInfo}>
                    {[
                        { icon: <MdOutlineSubtitles />, val: productNewTitle, set: setProductNewTitle, ph: "عنوان جدید را وارد کنید" },
                        { icon: <AiOutlineDollarCircle />, val: productNewPrice, set: setProductNewPrice, ph: "قیمت جدید را وارد کنید" },
                        { icon: <TbListNumbers />, val: productNewCount, set: setProductNewCount, ph: "موجودی جدید را وارد کنید" },
                        { icon: <AiFillPicture />, val: productNewImg, set: setProductNewImg, ph: "آدرس کاور جدید را وارد کنید" },
                        { icon: <TbChartBarPopular />, val: productNewPopularity, set: setProductNewPopularity, ph: "محبوبیت جدید را وارد کنید" },
                        { icon: <MdOutlinePointOfSale />, val: productNewSale, set: setProductNewSale, ph: "میزان فروش جدید را وارد کنید" },
                        { icon: <IoIosColorPalette />, val: productNewColors, set: setProductNewColors, ph: "تعداد رنگ بندی جدید را وارد کنید" },
                    ].map((f, i) => (
                        <div key={i} className='edit-products-form-group'>
                            <span>{f.icon}</span>
                            <input
                                type="text"
                                placeholder={f.ph}
                                className='edit-product-input'
                                value={f.val}
                                onChange={e => f.set(e.target.value)}
                            />
                        </div>
                    ))}
                </EditModal>
            )}
        </>
    )
}
