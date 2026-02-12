import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DiContextProvider } from './presentation/composition/di/di.provider.tsx'
import { LoadingProvider } from './presentation/composition/loading/loading.provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DiContextProvider>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </DiContextProvider>
  </StrictMode>,
)
