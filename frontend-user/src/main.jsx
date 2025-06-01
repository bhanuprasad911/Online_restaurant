import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/App.jsx'
import{BrowserRouter} from "react-router"
import { OrderProvider } from './context/OrderContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/user'>
    <OrderProvider>
    <App />
    </OrderProvider>
    </BrowserRouter>
  </StrictMode>,
)
