import { BrowserRouter, Route, Routes } from "react-router-dom"
import AppRouter from "./presentation/router/app.router"
import AppProviders from "./presentation/composition/providers/app.providers"

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<AppRouter />} />
        </Routes>
      </BrowserRouter>
    </AppProviders>
  )
}

export default App