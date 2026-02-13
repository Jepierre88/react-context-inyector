import AppRouter from "./presentation/router/app.router"
import AppProviders from "./presentation/composition/providers/app.providers"

function App() {
  return (
    <AppProviders>
      <AppRouter/>
    </AppProviders>
  )
}

export default App