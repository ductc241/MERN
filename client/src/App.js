import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './App.css'
import { DataProvider } from './GlobalState'


// Component - Common
import Header from './components/common/Header/Header'

// Component - Store
import Products from './components/store/Products/Products';

const App = () => {
  return (
    <DataProvider>
      <div className='app'>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/*">
					      <Route index element={<Navigate to="shop" />} />
                <Route path="shop" element={<Products />} />
		        </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </DataProvider>
  )
}

export default App
