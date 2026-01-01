import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, useParams } from 'react-router-dom'
import { AdminLayout } from './components/admin'
import { AddPackage, AddProduct, AllPackages, AllProducts, AllSetting, Dashboard, OrderDetail, OrderList, Orders, PackageDetail, Packages, ProductDetail, Products, Settings } from './pages/admin'
import { Account, Catalog, Category, ClientPackageDetail, ClientProductDetail, ClientProfile, Home, ProductsByCategory } from './pages/client'
import { ClientLayout } from './components/client'
import { AboutUs, CancellationPolicy, NotFound, PrivacyPolicy, RefundPolicy, ReturnPolicy, TermsConditions, UnAuth } from './pages/common'
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
          <Route path='account/profile' element={<ClientProfile />} />
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
          <Route path='settings' element={<Settings />}>
            <Route index element={<AllSetting />} />
          </Route>
        </Route>
        {/* <Route index element={<Home/>}/> */}
        <Route path="/auth/reset-password/:resetToken" element={null} />

        {/* Legal & Support */}
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms-&-conditions' element={<TermsConditions />} />
        <Route path='/refund-policy' element={<RefundPolicy />} />
        <Route path='/return-policy' element={<ReturnPolicy />} />
        <Route path='/cancellation-policy' element={<CancellationPolicy />} />
        <Route path='/about-us' element={<AboutUs />} />

        {/* Other's Pages */}
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
