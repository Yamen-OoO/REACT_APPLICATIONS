import {UNCATEGORIZED_BUDGET_ID , useBudget} from '../contexts/BudgetContext'
import BudgetCart from './BudgetCart'

function UncategorizedCard(props ) {
    const {getBudgetExpenses} = useBudget()
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((total , expense)=> total + expense.amount , 0)
    console.log(amount)

    // if amount = 0 .... no card is gonna be shown
    // if (amount === 0) return null

  return (
    <BudgetCart amount={amount} name="Uncategorized" gray {...props} />
  )
}

export default UncategorizedCard