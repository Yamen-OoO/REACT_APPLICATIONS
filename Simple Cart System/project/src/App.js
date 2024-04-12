import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Navbar from './componets/navbar';
import Cart from './pages/cart/cart.jsx'
import Shop from './pages/shop/shop.jsx'
import ShopContextProvider from './context/shopContext.jsx';

function App() {



  return (
    <div className='App'>
      <ShopContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} /> 
          <Route path='/cart/' element={<Cart />} /> 
        </Routes>
      </Router>
      </ShopContextProvider>
    </div>
  )
}

export default App;
