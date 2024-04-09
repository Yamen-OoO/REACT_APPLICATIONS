import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/globalContext'

function AddTransaction() {
    const { addTrans } = useContext(GlobalContext)
    const [text, setText] = useState("")
    const [amount, setAmout] = useState(0)


    const submit = e =>{
        e.preventDefault()
        const newTransaction = {
            id : Math.floor(Math.random() * 10000000),
            text , 
            amount : +amount
        }
        addTrans(newTransaction)
    }


    return (
        <>
            <h3>Add new transaction</h3>
            <form onSubmit={submit}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input required type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="amount"
                    >Amount <br />
                        (negative - expense, positive - income)</label
                    >
                    <input required type="number" value={amount} onChange={e => setAmout(e.target.value)} placeholder="Enter amount..." />
                </div>
                <button className="btn">Add transaction</button>
            </form>
        </>
    )
}

export default AddTransaction