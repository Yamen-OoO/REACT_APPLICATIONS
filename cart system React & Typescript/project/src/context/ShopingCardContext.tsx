import React, { ReactNode, createContext, useContext, useState } from 'react'
import { ShopingCart } from '../componets/ShoppingCart'

type ShoppingCartProvicerProps = {
    children: ReactNode
}
type CartItem = {
    id: number,
    quantity: number
}
type ShoppingCartContext = {
    openCart: () => void,
    closeCart: () => void,
    getItemQuantity: (id: number) => number,
    increaseItemQuantity: (id: number) => void,
    decreaseItemQuantity: (id: number) => void,
    removeFromCart: (id: number) => void,
    cartQuantity: number, // for popup number
    cartItems: CartItem[] // for items insider the sidebar

}

const shoppingCartContext = createContext({} as ShoppingCartContext)


export function useShoppingCartContext() {
    return useContext(shoppingCartContext)
}

function ShoppingCartProvider({ children }: ShoppingCartProvicerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useState<CartItem>([])
    // console.log(cartItems)

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0) // small number in red circle
    // console.log(cartQuantity)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseItemQuantity(id: number) {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id) == null) {
                return [...currentItems, { id, quantity: 1 }]
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    }
                    else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseItemQuantity(id: number) {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id)?.quantity == 1) {
                return currentItems.filter(item => item.id !== id)
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    }
                    else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id: number) {
        setCartItems(currentItems => {
            return currentItems.filter(item => item.id !== id)
        })
    }


    return (
        <shoppingCartContext.Provider value={{ getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeFromCart, openCart, closeCart, cartItems, cartQuantity }}>
            {children}
            <ShopingCart isOpen={isOpen} />
        </shoppingCartContext.Provider>
    )
}

export default ShoppingCartProvider