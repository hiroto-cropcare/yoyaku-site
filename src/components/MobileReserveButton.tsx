import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileReserveButton: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 md:hidden z-30">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 15,
          delay: 0.5 
        }}
      >
        <Link
          to="/reserve"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-black shadow-lg hover:bg-primary/90 active:scale-95 transition-all"
          aria-label="Reserve Now"
        >
          <ShoppingCart className="w-6 h-6" />
        </Link>
      </motion.div>
    </div>
  );
};

export default MobileReserveButton;