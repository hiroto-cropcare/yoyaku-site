import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, PlusSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const CompletionPage: React.FC = () => {
  return (
    <div className="pt-16 min-h-screen">
      <div className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto text-center"
        >
          <div className="bg-green-100 text-green-800 font-medium px-4 py-2 rounded-full inline-block mb-4">
            Order Successful
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Thank You for Your Reservation!
          </h1>
          
          <p className="text-gray-700 mb-10">
            Your order has been confirmed. Please use this QR code when you arrive at the event.
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-10">
            <div className="border-4 border-primary p-4 rounded-lg inline-block mb-4">
              <QrCode className="w-48 h-48 mx-auto" />
            </div>
            
            <p className="text-sm text-gray-600 mt-2">
              Order #PF20254789
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn btn-outline flex items-center gap-2 min-w-40">
              <PlusSquare className="w-5 h-5" />
              Add to Wallet
            </button>
            
            <Link to="/" className="btn btn-primary min-w-40">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CompletionPage;