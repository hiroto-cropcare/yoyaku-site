import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Rotate3D as Potato } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container-custom flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <Potato className="w-6 h-6 text-primary" />
          <span className="font-poppins font-bold text-lg">ポテちゃんポテトフェス</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" isActive={isActive('/')}>
            ホーム
          </NavLink>
          <NavLink to="/members" isActive={isActive('/members')}>
            メンバー
          </NavLink>
          <NavLink to="/reserve" isActive={isActive('/reserve')}>
            予約
          </NavLink>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={onMenuClick}
          aria-label="メニューを開く"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, isActive, children }) => {
  return (
    <Link
      to={to}
      className={`relative px-1 py-2 font-medium transition-colors ${
        isActive 
          ? 'font-bold text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary' 
          : 'text-gray-700 hover:text-black'
      }`}
    >
      {children}
    </Link>
  );
};

export default Header;