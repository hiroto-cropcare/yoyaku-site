import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface OrderSummaryBarProps {
  totalPrice: number;
  onNext: () => void;
  canProceed: boolean;
  nextLabel: string;
}

const OrderSummaryBar: React.FC<OrderSummaryBarProps> = ({ 
  totalPrice, 
  onNext, 
  canProceed,
  nextLabel
}) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-10"
    >
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-600">Subtotal</div>
            <div className="text-xl font-bold">¥{totalPrice.toLocaleString()}</div>
          </div>
          
          <button 
            className={`btn btn-primary ${!canProceed ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={canProceed ? onNext : undefined}
            disabled={!canProceed}
          >
            {nextLabel}
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummaryBar;