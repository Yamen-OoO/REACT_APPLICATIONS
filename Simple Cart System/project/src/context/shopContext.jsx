import React, { createContext, useState } from 'react'
import { PRODUCTS } from '../products'


export const ShopConetext = createContext(null)

const DefaultCart = () => {
    let cart = {}
    for (let i = 1; i <= PRODUCTS.length + 1; i++) {
        cart[i] = 0
    }
    return cart
}

// {1:0 , 2:0 , 3:0 , 4:0 , 5:0 ,6:0 , 7:0 , 8:0}
// depending on the id we add quntity ... for example add to item 1 ===> {1:1 , .........}
// we export this object and the fucntion that update this object(addtocart , removefromcart , updateCartItemCount)
// if you want to make ... itemtotalPrice .... build a function that loop through the cartItems of items that are not 0 {1:4 , 2:6 ....}
// and then calculate the the total price and return the value and use it in the cart at the bottom


function ShopContextProvider(props) {

    const [cartItems, setItems] = useState(DefaultCart())

    const addToCart = (id) => {
        setItems((prev) => (
            { ...prev, [id]: prev[id] + 1 }
        ))
    }
    const removeFromCart = (id) => {
        setItems((prev) => ({ ...prev, [id]: prev[id] - 1 }))
    }

    const updateCartItemCount = (newAmout , id) =>{
        setItems(
            (prev) => ({...prev , [id] : newAmout})
        )
    }


    const contextValues = {
        cartItems , addToCart , removeFromCart , updateCartItemCount
    }

    return (
        <ShopConetext.Provider value={contextValues}>
            {props.children}
        </ShopConetext.Provider>
    )
}

export default ShopContextProvider