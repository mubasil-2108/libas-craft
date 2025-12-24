import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, useParams } from 'react-router-dom'
import { AdminLayout } from './components/admin'
import { AddPackage, AddProduct, AllPackages, AllProducts, Dashboard, OrderDetail, OrderList, Orders, PackageDetail, Packages, ProductDetail, Products } from './pages/admin'
import { Account, Catalog, Category, ClientPackageDetail, ClientProductDetail, Home, ProductsByCategory } from './pages/client'
import { ClientLayout } from './components/client'
import { NotFound, UnAuth } from './pages/common'
import { ResetPassword } from './components/common'

function App() {
  const location = useLocation();
  // const { resetToken } = useParams();
  const [resetOpen, setResetOpen] = useState(false);
  const [resetToken, setResetToken] = useState(null);

  useEffect(() => {
    const match = location.pathname.match(
      /^\/auth\/reset-password\/(.+)$/
    );

    if (match) {
      setResetToken(match[1]); // 👈 extract token
      setResetOpen(true);
    } else {
      setResetOpen(false);
      setResetToken(null);
    }
  }, [location.pathname]);
  return (
    <>
      <Routes>
        <Route path='/' element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path='collections/all' element={<Catalog />} />
          <Route path='collections/:id' element={<ClientProductDetail />} />
          <Route path='account/orders' element={<Account />} />
          <Route path='categories' element={<Category />} />
          <Route path="categories/:categorySlug" element={<ProductsByCategory />} />
          <Route path='categories/:categorySlug/:id' element={<ClientProductDetail />} />
          <Route path='main-product/:id' element={<ClientProductDetail />} />
          <Route path='package/:id' element={<ClientPackageDetail />} />
          <Route path='package/product/:id' element={<ClientProductDetail />} />
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
            <Route path='product/:productId' element={<ProductDetail />} />
          </Route>

          {/* Packages */}
          <Route path='packages' element={<Products />} >
            <Route index element={<AllPackages />} />
            <Route path=':id' element={<PackageDetail />} />
            <Route path='add-new-package' element={<AddPackage />} />
          </Route>
        </Route>
        {/* <Route index element={<Home/>}/> */}
        <Route path="/auth/reset-password/:resetToken" element={null} />
        <Route path='/401' element={<UnAuth />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      {resetOpen && (
        <ResetPassword
          open={resetOpen}
          resetToken={resetToken}
          handleClose={() => setResetOpen(false)}
        />
      )}
    </>
  )
}

export default App
