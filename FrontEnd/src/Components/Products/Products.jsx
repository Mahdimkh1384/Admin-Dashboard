import React , {useState} from 'react'
import "./Products.css"
import ErrorBox from '../Error Box/ErrorBox'
import AddNewProduct from '../AddNewProduct/AddNewProduct'
import ProductsTable from '../ProductsTable/ProductsTable'


export default function Products() {

    const [allProducts, setAllProducts] = useState([])

        const getAllProducts = () => {
        fetch("http://localhost:8000/api/products/")
            .then(res => res.json())
            .then(data => setAllProducts(data.reverse()))
    }

    return (
        <div>
            <AddNewProduct getAllProducts= {getAllProducts}/>
            <ProductsTable allProducts={allProducts}  getAllProducts= {getAllProducts} setAllProducts={setAllProducts}/>
        </div>
    )
}
