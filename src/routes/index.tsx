import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'

export default function AppRoutes() {

  const routes = [
    {
      path: '/',
      component: <Home />
    },
    {
      path: '/*',
      component: <h1>404</h1>
    }
  ]

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}