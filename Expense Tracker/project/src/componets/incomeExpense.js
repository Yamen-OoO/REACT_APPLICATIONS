import React , {useContext} from 'react'
import { GlobalContext } from '../context/globalContext'

function IncomeExpense() {
    const {transactions} = useContext(GlobalContext) 
    const amounts = transactions.map(transaction => transaction.amount)

    const inome = amounts.filter( item => item>0)
    .reduce((acc , item) => acc+item)
    .toFixed(2) 

    const expense = amounts.filter( item => item<0)
    .reduce((acc , item) => acc+item)
    .toFixed(2) * -1


    return (
        <div className="inc-exp-container">
            <div>
                <h4>Income</h4>
                <p  className="money plus">{inome}</p>
            </div>
            <div>
                <h4>Expense</h4>
                <p className="money minus">{expense}</p>
            </div>
        </div>
    )
}

export default IncomeExpense