import React, { useState } from 'react'
import "./AddNewProduct.css"

export default function AddNewProduct({ getAllProducts }) {

    const [newProductTitle, setNewProductTitle] = useState("")
    const [newProductPrice, setNewProductPrice] = useState("")
    const [newProductCount, setNewProductCount] = useState("")
    const [newProductImg, setNewProductImg] = useState("")
    const [newProductPopularity, setNewProductPopularity] = useState("")
    const [newProductSale, setNewProductSale] = useState("")
    const [newProductColors, setNewProductColors] = useState("")


    const clearInputsValue = () => {
        setNewProductTitle("")
        setNewProductPrice("")
        setNewProductCount("")
        setNewProductImg("")
        setNewProductPopularity("")
        setNewProductSale("")
        setNewProductColors("")
    }

    const addNewProduct = (event) => {
        event.preventDefault();

        let newProductInformation = {
            title: newProductTitle,
            price: newProductPrice,
            count: newProductCount,
            img: newProductImg,
            popularity: newProductPopularity,
            sale: newProductSale,
            colors: newProductColors
        }

        fetch("http://localhost:8000/api/products/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProductInformation)
        })
            .then(res => res.json())
            .then(result => {
                getAllProducts()
                clearInputsValue()
            })
    }


    return (
        <div className='products-main'>
            <h1 className='products-title'>افزودن محصول جدید</h1>
            <form action="#" className='add-products-form'>
                <div className="add-product-form-wrap">
                    <div className="add-products-form-group">
                        <input type="text"
                            placeholder='اسم محصول را بنویسید'
                            className='add-products-input'
                            value={newProductTitle}
                            onChange={(e) => setNewProductTitle(e.target.value)}
                        />
                    </div>
                    <div className="add-products-form-group">
                        <input type="text"
                            placeholder='قیمت محصول را بنویسید'
                            className='add-products-input'
                            value={newProductPrice}
                            onChange={(e) => setNewProductPrice(e.target.value)}
                        />
                    </div>
                    <div className="add-products-form-group">
                        <input type="text"
                            placeholder='موجودی محصول را بنویسید'
                            className='add-products-input'
                            value={newProductCount}
                            onChange={(e) => setNewProductCount(e.target.value)}
                        />
                    </div>
                    <div className="add-products-form-group">
                        <input type="text"
                            placeholder='آدرس عکس محصول را بنویسید'
                            className='add-products-input'
                            value={newProductImg}
                            onChange={(e) => setNewProductImg(e.target.value)}
                        />
                    </div>
                    <div className="add-products-form-group">
                        <input type="text"
                            placeholder='میزان محبوبیت محصول را بنویسید'
                            className='add-products-input'
                            value={newProductPopularity}
                            onChange={(e) => setNewProductPopularity(e.target.value)}
                        />
                    </div>
                    <div className="add-products-form-group">
                        <input type="text"
                            placeholder='میزان فروش محصول را بنویسید'
                            className='add-products-input'
                            value={newProductSale}
                            onChange={(e) => setNewProductSale(e.target.value)}
                        />
                    </div>
                    <div className="add-products-form-group">
                        <input type="text"
                            placeholder='تعداد رنگ بندی محصول را بنویسید'
                            className='add-products-input'
                            value={newProductColors}
                            onChange={(e) => setNewProductColors(e.target.value)}
                        />
                    </div>
                </div>
                <button className='add-products-submit' onClick={(event) => addNewProduct(event)}>ثبت محصول</button>
            </form>
        </div>
    )
}
