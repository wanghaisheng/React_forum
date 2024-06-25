import { BrowserRouter } from 'react-router-dom';
import AppContent from './components/appContent';

function AppRoutes() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default AppRoutes;