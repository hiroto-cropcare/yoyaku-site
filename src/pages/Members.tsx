import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Members: React.FC = () => {
  return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      <div className="container-custom text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-accent font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
            Coming Soon
          </h1>
          
          <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            おいしいものを準備中です。もうしばらくお待ちください！
          </p>
          
          <Link 
            to="/reserve" 
            className="btn btn-primary text-lg px-8 py-3"
          >
            予約ページへ戻る
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Members;