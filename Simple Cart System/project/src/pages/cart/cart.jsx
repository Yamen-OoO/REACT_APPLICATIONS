import React, { useContext } from 'react'
import { PRODUCTS } from '../../products'
import { ShopConetext } from '../../context/shopContext'
import CartItem from './cartItem'
import './cart.css'
import {useNavigate} from 'react-router-dom'


function Cart() {
  const navigate = useNavigate()
  const { cartItems } = useContext(ShopConetext)

  return (
    <div className='cart'>
      <div>
        <h1>Your Carts Items</h1>
      </div>
      <div className='cartItems'>
        {PRODUCTS.map((product , index) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem key={index} data={product} />
          }
        })}
      </div>
      <div>
        <button onClick={() => navigate("/")} >Go Back Shoping</button>
      </div>
    </div>
  )
}

export default Cart