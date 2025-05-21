import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Check } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  amount: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  onComplete, 
  amount 
}) => {
  useEffect(() => {
    if (isOpen) {
      // Auto-complete payment after 3 seconds
      const timer = setTimeout(() => {
        onComplete();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onComplete]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">PayPay Payment</h3>
                <p className="text-gray-600">
                  Scan this QR code with your PayPay app to complete payment.
                </p>
              </div>
              
              <div className="flex justify-center mb-6">
                <div className="border-4 border-primary p-4 rounded-lg inline-block relative">
                  <QrCode className="w-48 h-48" />
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, scale: [1, 1.1, 1] }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="absolute inset-0 bg-white/90 flex items-center justify-center rounded-lg"
                  >
                    <div className="text-center">
                      <div className="bg-green-100 text-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Check className="w-8 h-8" />
                      </div>
                      <p className="font-bold text-green-700">Payment Received</p>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-sm text-gray-600">Amount</div>
                <div className="text-2xl font-bold">¥{amount.toLocaleString()}</div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;