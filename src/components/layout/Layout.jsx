/**
 * Component: Layout
 * Purpose: Main layout wrapper with sidebar
 * Props: children, currentPath
 */

import Sidebar from './Sidebar';
import { useLocation, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  return (
    <div className="flex">
      <Sidebar currentPath={currentPath} onNavigate={navigate} />
      <div className="flex-1 bg-gray-50 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default Layout;
