import { Button, Container, Stack } from "react-bootstrap"
import BudgetCart from './componets/BudgetCart.jsx'
import AddBudgetModal from './componets/AddBudgetModal.jsx'
import AddExpenseModal from './componets/AddExpenseModal.jsx'
import { useState } from "react"
import { useBudget } from './contexts/BudgetContext.jsx'
import UncategorizedCard from './componets/UncategorizedCard.jsx'

function App() {
  const { budgets, getBudgetExpenses } = useBudget()
  const [showAddBudgetModal, setShowAddBugetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [addExpenseModalBudgetId , setAddExpenseModalBudgetId ] = useState()

  function openAddExpenseModal(budgetId){
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }


  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBugetModal(true)}>Add Budget</Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
        </Stack>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill , minmax(300px , 1fr))", gap: "1rem", alignItems: "flex-start" }}>


          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce((total , expnse) => total  + expnse.amount , 0)
            return (
              <BudgetCart key={budget.id} name={budget.name} gray amount={amount} max={budget.max} onAddExpenseClick={()=> openAddExpenseModal(budget.id)}>
              </BudgetCart>
            )
          }
          )}
          <UncategorizedCard />
        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBugetModal(false)} />
      <AddExpenseModal show={showAddExpenseModal} defaultBudgetId={addExpenseModalBudgetId} handleClose={() => setShowAddExpenseModal(false)} />
    </>
  )
}

export default App
