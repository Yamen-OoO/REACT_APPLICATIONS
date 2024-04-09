import './App.css';
import React from 'react';
import Header from './componets/header';
import Balance from './componets/balance'
import IncomeExpense from './componets/incomeExpense';
import TransactionList from './componets/transactionList';
import AddTransaction from './componets/addTransaction';
import { GlobalProvider } from './context/globalContext';

function App() {


  return (
    <GlobalProvider>
      <Header />
      <div className='container'>
        <Balance />
        <IncomeExpense />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  )
}

export default App;
