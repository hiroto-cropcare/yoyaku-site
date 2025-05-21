import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileNavDrawer from './MobileNavDrawer';
import MobileReserveButton from './MobileReserveButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  const isReservationPage = location.pathname.includes('/reserve');

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onMenuClick={toggleDrawer} />
      
      <MobileNavDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
      
      <main className="flex-grow">
        {children}
      </main>

      {!isReservationPage && <MobileReserveButton />}
      
      <Footer />
    </div>
  );
};

export default Layout;