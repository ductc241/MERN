import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './App.css'
import { DataProvider } from './GlobalState'


// Component - Common
import Header from './components/common/Header/Header'

// Component - Store
import Products from './components/store/Products/Products';
import ProductDetail from './components/store/ProductDetail/ProductDetail';
import Login from './components/auth/Login/Login';

const App = () => {
  return (
    <DataProvider>
      <div className='app'>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route index element={<Navigate to="shop" />} />
            <Route path="shop" element={<Products />} />
            <Route path="shop/:id" element={<ProductDetail />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </DataProvider>
  )
}

export default App
