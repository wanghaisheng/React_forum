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
import TermsPage from '../pages/Terms'
import PrivacyPage from '../pages/Privacy'
import HelpPage from '../pages/Help'
import ExploreTopicsPage from '../pages/ExploreTopics'
import WeekTopicsPage from '../pages/WeekTopics/[id]'
import NotFoundPage from '../pages/NotFound'

export default function AppRoutes() {
  const routes = [
    {
      path: '/',
      component: <Home />
    },
    {
      path: '/topics/explore',
      component: <ExploreTopicsPage />
    },
    {
      path: '/topics/explore/week/:id',
      component: <WeekTopicsPage />
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
      component: <HelpPage />
    },
    {
      path: '/privacy',
      component: <PrivacyPage />
    },
    {
      path: '/terms',
      component: <TermsPage />
    },
    {
      path: '/*',
      component: <NotFoundPage />
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