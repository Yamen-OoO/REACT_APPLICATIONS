import React, { useContext } from 'react'
import { ShopConetext } from '../../context/shopContext'

function Product(props) {
    const { id, productName, price, productImage } = props.data
    const {addToCart , cartItems} = useContext(ShopConetext)
    let itemsNumber = cartItems[id]
    return (
        <div className='product'>
            <img src={productImage} alt='' />
            <div className='description'>
                <p>
                    <b>{productName}</b>
                </p>
                <p>{price}</p>
                <button className='addToCartBttn' onClick={()=> addToCart(id)}>Add to Cart {itemsNumber > 0 && <> ( {itemsNumber} ) </>}</button>
            </div>
        </div>
    )
}

export default Product