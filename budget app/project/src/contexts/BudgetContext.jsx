import { createContext, useContext, useState } from "react";
import { v4 as uuidV4 } from 'uuid'
import useLocalStorage from "../hooks/useLocalStorge";

export const UNCATEGORIZED_BUDGET_ID = 'Uncatagorized'

const BudgetContext = createContext()

export function useBudget() {
    return useContext(BudgetContext)
}


// //budget object
// {
//     id :
//     name : 
//     max :
// }
// //expense object
// {
//     id : 
//     budgetId : 
//     amount : 
//     description :
// }

export const BudgetProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("budgets",[])
    const [expenses, setExpense] = useLocalStorage("expenses",[])

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId)

    }
    function addExpense({ description, amount, budgetId }) {
        setExpense(prevExpenses => {
            return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }]
        })

    }


    function addBudget({ name, max }) {
        setBudgets((prevBudgets) => {
            // check if the budget is exsist before ... if so , return the same budgets
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets
            }
            return [...prevBudgets, { id: uuidV4(), name, max }]
        })

    }
    function deleteBudget({ id }) {
        //Todo : Deal with Expenses , and pass them to uncategornized card
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }

    function deleteExpense({ id }) {
        setExpense(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }

    return (
        <BudgetContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense,
        }}>
            {children}
        </BudgetContext.Provider>
    )
}