import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AdminLayout } from './components/admin'
import { AddProduct, AllProducts, Dashboard, OrderList, Orders, ProductDetail, Products } from './pages/admin'

function App() {

  return (
    <>
      <Routes>
        <Route path='/admin' element={<AdminLayout />} >
          <Route path='dashboard' element={<Dashboard />} />
          {/* Products */}
          <Route path='products' element={<Products />}>
            <Route index element={<AllProducts />} />
            <Route path=':id' element={<ProductDetail />} />
            <Route path='add-new-product' element={<AddProduct />} />
          </Route>

          {/* Orders */}
          <Route path='orders' element={<Orders />}>
            <Route index element={<OrderList />} />
          </Route>

        </Route>
      </Routes>
    </>
  )
}

export default App
