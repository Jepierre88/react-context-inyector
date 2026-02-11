import { BrowserRouter, Route, Routes } from "react-router-dom"
import AppRouter from "./presentation/router/app.router"
import { ThemeProvider } from "./presentation/composition/theme/theme.context"

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<AppRouter />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App