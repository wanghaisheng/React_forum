import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import { LayoutContainer, Wrapper } from '../layout';
import Aside from '../../components/Aside';
import SideMenu from '../../components/SideMenu';
import BottomMenu from '../../components/BottomMenu';
import MainRoutes from '../components/mainRoutes';
import AuthRoutes from '../components/authRoutes';

function AppContent() {
  const location = useLocation();
  const isAuthRoute = location.pathname.startsWith('/sign');

  return (
    <>
      {!isAuthRoute && (
        <>
          <Header />
          <Wrapper>
            <LayoutContainer>
              <SideMenu />
              <MainRoutes />
              <Aside />
              <BottomMenu />
            </LayoutContainer>
          </Wrapper>
        </>
      )}

      {isAuthRoute && <AuthRoutes />}
    </>
  );
}

export default AppContent;
