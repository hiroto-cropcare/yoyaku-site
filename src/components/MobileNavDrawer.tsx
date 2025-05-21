import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Instagram, Atom as Tiktok } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-xs bg-white z-50 flex flex-col shadow-xl"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-poppins font-bold text-lg">メニュー</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-gray-100"
                aria-label="メニューを閉じる"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="flex flex-col py-4">
              <NavItem to="/" onClick={onClose}>ホーム</NavItem>
              <NavItem to="/members" onClick={onClose}>メンバー</NavItem>
              <NavItem to="/reserve" onClick={onClose}>予約</NavItem>
            </nav>
            
            <div className="mt-auto p-4 border-t">
              <p className="text-sm text-gray-600 mb-3">フォローする：</p>
              <div className="flex gap-4">
                <a href="#" className="p-2 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors">
                  <Tiktok className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

interface NavItemProps {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, onClick, children }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="px-6 py-3 hover:bg-gray-100 transition-colors text-lg font-medium"
    >
      {children}
    </Link>
  );
};

export default MobileNavDrawer;