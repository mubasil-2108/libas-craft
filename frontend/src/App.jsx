import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AdminLayout } from './components/admin'
import { AddProduct, AllProducts, Dashboard, OrderDetail, OrderList, Orders, ProductDetail, Products } from './pages/admin'
import { Catalog, ClientProductDetail, Home } from './pages/client'
import { ClientLayout } from './components/client'
import { NotFound, UnAuth } from './pages/common'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path='collections/all' element={<Catalog />} />
          <Route path='collections/:id' element={<ClientProductDetail />} />
        </Route>
        <Route path='/admin' element={<AdminLayout />} >
          <Route index element={<Dashboard />} />
          {/* Products */}
          <Route path='products' element={<Products />}>
            <Route index element={<AllProducts />} />
            <Route path=':id' element={<ProductDetail />} />
            <Route path='add-new-product' element={<AddProduct />} />
          </Route>

          {/* Orders */}
          <Route path='orders' element={<Orders />}>
            <Route index element={<OrderList />} />
            <Route path=':id' element={<OrderDetail />} />
          </Route>
        </Route>
        {/* <Route index element={<Home/>}/> */}
        <Route path='/401' element={<UnAuth />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
