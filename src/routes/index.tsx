import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Header from '../components/Header'
import { LayoutContainer, Wrapper } from './layout'
import Aside from '../components/Aside'
import SideMenu from '../components/SideMenu'
import BottomMenu from '../components/BottomMenu'

export default function AppRoutes() {
  const routes = [
    {
      path: '/',
      component: <Home />
    },
    {
      path: '/topics/explore',
      component: <h1>Explore</h1>
    },
    {
      path: '/topics/search',
      component: <h1>Search</h1>
    },
    {
      path: '/topics/my-topics',
      component: <h1>My Topics</h1>
    },
    {
      path: '/topics/my-answers',
      component: <h1>My Answers</h1>
    },
    {
      path: '/topics/topic/:id',
      component: <h1>Topic</h1>
    },
    {
      path: '/topics/new-topic',
      component: <h1>New Topic</h1>
    },
    {
      path: '/users/:id',
      component: <h1>User</h1>
    },
    {
      path: '/profile',
      component: <h1>Profile</h1>
    },
    {
      path: '/about',
      component: <h1>About</h1>
    },
    {
      path: '/help',
      component: <h1>Help</h1>
    },
    {
      path: '/terms',
      component: <h1>Terms</h1>
    },
    {
      path: '/*',
      component: <h1>404</h1>
    }
  ]

  return (
    <BrowserRouter>
      <Header />
      <Wrapper>
        <LayoutContainer>
          <SideMenu />
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.component} />
            ))}
          </Routes>
          <Aside className='asideRight'>
            <h1>Aside</h1>
          </Aside>

          <BottomMenu>
            <h1>Bottom menu</h1>
          </BottomMenu>
        </LayoutContainer>
      </Wrapper>
    </BrowserRouter>
  )
}