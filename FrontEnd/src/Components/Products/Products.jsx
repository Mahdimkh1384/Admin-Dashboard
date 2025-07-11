import React, { useState } from 'react'
import "./Products.css"
import AddNewProduct from '../AddNewProduct/AddNewProduct'
import ProductsTable from '../ProductsTable/ProductsTable'


export default function Products() {

    const [allProducts, setAllProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getAllProducts = () => {
        fetch("https://backend.mahdi-dev.ir/api/products/")
            .then(res => res.json())
            .then(data => {
                setAllProducts(data.reverse())
                setIsLoading(false)
            })
    }

    return (
        <div>
            <AddNewProduct getAllProducts={getAllProducts} />
            <ProductsTable allProducts={allProducts} getAllProducts={getAllProducts} setAllProducts={setAllProducts} isLoading={isLoading} />
        </div>
    )
}
