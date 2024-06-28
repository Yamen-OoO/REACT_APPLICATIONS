import React from 'react'
import { Button, Card } from 'react-bootstrap'
import formatCurrency from '../utilites/formatCurrency'
import { useShoppingCartContext } from '../context/ShopingCardContext'
type storeitemsProps = {
    id: number,
    name: string,
    price: number,
    imgUrl: string
}

function StoreItem({ id, name, price, imgUrl }: storeitemsProps) {
    const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeFromCart } = useShoppingCartContext()
    const quantity = getItemQuantity(id)
    return (
        <Card className='h-100'>
            <Card.Img variant="top" src={imgUrl} height="200px" style={{ objectFit: "cover" }} />
            <Card.Body className='d-flex flex-column' >
                <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
                    <span className='fs-2'>{name}</span>
                    <span className='ms-2 text-muted'>{formatCurrency(price)}</span>
                </Card.Title>
                <div className='mt-auto'>
                    {quantity === 0
                        ? (<Button className='w-100' onClick={() => increaseItemQuantity(id)}>+ Add To Cart</Button>)

                        : (
                            <div className='d-flex align-items-center flex-column' style={{ gap: "0.5rem" }}>
                                <div className='d-flex align-items-center justify-content-center' style={{ gap: "0.5rem" }}>
                                    <Button onClick={() => increaseItemQuantity(id)}>+</Button>
                                    <div>
                                        <span className='fs-1'>{quantity}</span> In Cart
                                    </div>
                                    <Button onClick={() => decreaseItemQuantity(id)}>-</Button>
                                </div>
                                <Button variant='danger' onClick={() => removeFromCart(id)}>Remove</Button>
                            </div>
                        )

                    }
                </div>
            </Card.Body>

        </Card>
    )
}

export default StoreItem