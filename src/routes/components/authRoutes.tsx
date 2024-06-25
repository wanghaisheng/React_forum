import { Routes, Route } from 'react-router-dom'

import SignIn from '../../pages/SignIn'

function AuthRoutes() {
  const routes = [
    {
      path: '/signin',
      component: <SignIn />
    }
  ]
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.component} />
      ))}
    </Routes>
  )
}

export default AuthRoutes;
