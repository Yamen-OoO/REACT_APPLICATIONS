import React, { useContext } from 'react'
import { GlobalContext } from '../context/globalContext'
import Transaction from './transaction'


function TransactionList() {
    const { transactions } = useContext(GlobalContext)
    return (
        <>
            <h3>History</h3>
            <ul id="list" className="list">
                {transactions.map(transaction => (
                    <Transaction key={transaction.id} transaction={transaction} />
                ))}
            </ul>
        </>
    )
}

export default TransactionList