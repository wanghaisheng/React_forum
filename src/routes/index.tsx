import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Header from '../components/Header'
import { LayoutContainer, Wrapper } from './layout'
import Aside from '../components/Aside'
import SideMenu from '../components/SideMenu'
import BottomMenu from '../components/BottomMenu'
import TopicPage from '../pages/Topic/[id]'
import ProfilePage from '../pages/Profile/[id]'
import NewTopicPage from '../pages/NewTopic'
import AboutPage from '../pages/About'

export default function AppRoutes() {
  const routes = [
    {
      path: '/',
      component: <Home />
    },
    {
      path: '/topics/explore',
      component: <main>
        <h1>Explore topics</h1>
      </main>
    },
    {
      path: '/topics/search',
      component: <main>
        <h1>Search</h1>
      </main>
    },
    {
      path: '/topics/my-topics',
      component: <main>
        <h1>My topics</h1>
      </main>
    },
    {
      path: '/topics/my-answers',
      component: <main>
        <h1>My answers</h1>
      </main>
    },
    {
      path: '/topics/topic/:id',
      component: <TopicPage />
    },
    {
      path: '/topics/new-topic',
      component: <NewTopicPage />
    },
    {
      path: '/users/:id',
      component: <main>
        <h1>User</h1>
      </main>
    },
    {
      path: '/profile/:id',
      component: <ProfilePage />
    },
    {
      path: '/about',
      component: <AboutPage />
    },
    {
      path: '/help',
      component: <main>
        <h1>Help</h1>
      </main>
    },
    {
      path: '/privacy',
      component: <main>
        <h1>Privacy</h1>
      </main>
    },
    {
      path: '/terms',
      component:
        <main>
          <h1>Terms</h1>
        </main>
    },
    {
      path: '/*',
      component: <main>
        <h1>404 - Not found</h1>
      </main>
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
          <Aside />

          <BottomMenu>
            <h1>Bottom menu</h1>
          </BottomMenu>
        </LayoutContainer>
      </Wrapper>
    </BrowserRouter>
  )
}