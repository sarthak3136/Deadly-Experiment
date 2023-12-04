import React from 'react'
import Rating from './Rating'
import "../styles/Product.css"
import { Link } from 'react-router-dom'


const Product = ({product}) => {

    return (
        <Link to={`/products/product/${product.product_id}`}>
        <div className="product-card" >
            <div className="product-image">
                <img src= {product.image} alt=""/>
            </div>
            <h2>{product.brand}</h2>
            <Rating rating={product.ratings} numRev={product.numRev}/>
            <p>${product.price}</p>
        </div>
        </Link>
    )
}

export default Product
