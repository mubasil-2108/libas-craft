import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider, useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store/store.js'
import { Toaster } from 'react-hot-toast'
// import AuthWrapper from './AuthWrapper.jsx'
import App from './App.jsx'
import AuthInitializer from './AuthInitializer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthInitializer>
          <App />
        </AuthInitializer>
        <Toaster />
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
