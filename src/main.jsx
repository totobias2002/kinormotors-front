import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { ModelosProvider } from './context/ModelosContext'
import { capturarOrigen } from './services/tracking'

capturarOrigen()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ModelosProvider>
        <App />
      </ModelosProvider>
    </BrowserRouter>
  </StrictMode>,
)
