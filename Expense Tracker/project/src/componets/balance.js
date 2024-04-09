import React , {useContext} from 'react'
import { GlobalContext } from '../context/globalContext'

const Balance = () => {
    const {transactions} = useContext(GlobalContext)
    const amounts = transactions.map(transaction => transaction.amount)
    const total = amounts.reduce((acc , current) => acc+current , 0).toFixed(2)
    console.log(amounts)
    console.log(total)
    return (
        <>
            <h4>Your Balance</h4>
            <h1>{`$${total}`}</h1>
        </>
    )
}

export default Balance
