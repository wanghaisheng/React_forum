import { Provider } from 'react-redux'
import AppRoutes from './routes'
import GlobalStyle from './styles/global'
import store from './store'

function App() {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </>
  )
}

export default App
