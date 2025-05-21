import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet } from 'lucide-react';
import { OrderInfo, Product, TimeSlot } from '../../types';
import PaymentModal from './PaymentModal';

interface InfoPaymentProps {
  orderInfo: OrderInfo;
  onChange: (info: Partial<OrderInfo>) => void;
  products: Product[];
  timeSlot: TimeSlot;
  totalPrice: number;
  onBack: () => void;
}

const InfoPayment: React.FC<InfoPaymentProps> = ({
  orderInfo,
  onChange,
  products,
  timeSlot,
  totalPrice,
  onBack
}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (orderInfo.paymentMethod === 'paypay') {
      setShowPaymentModal(true);
    } else {
      // Simulate successful payment
      setTimeout(() => {
        navigate('/reserve/complete');
      }, 1000);
    }
  };

  const isFormValid = orderInfo.name && orderInfo.phone && orderInfo.email && orderInfo.paymentMethod;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Information & Payment</h1>
        <p className="text-gray-600 mb-6">
          Complete your reservation details and payment.
        </p>
        
        <form onSubmit={handleSubmit} className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-4">Personal Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={orderInfo.name}
                    onChange={(e) => onChange({ name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={orderInfo.phone}
                    onChange={(e) => onChange({ phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={orderInfo.email}
                    onChange={(e) => onChange({ email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-lg mb-4">Payment Method</h3>
                
                <div className="space-y-3">
                  <label className={`block p-3 border rounded-md cursor-pointer transition-all ${
                    orderInfo.paymentMethod === 'card' ? 'border-primary bg-primary/10' : 'border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={orderInfo.paymentMethod === 'card'}
                      onChange={() => onChange({ paymentMethod: 'card' })}
                      className="sr-only"
                    />
                    <div className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-3" />
                      <div>
                        <span className="font-medium">Credit/Debit Card</span>
                        <p className="text-xs text-gray-500">Powered by Square</p>
                      </div>
                    </div>
                  </label>
                  
                  <label className={`block p-3 border rounded-md cursor-pointer transition-all ${
                    orderInfo.paymentMethod === 'paypay' ? 'border-primary bg-primary/10' : 'border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypay"
                      checked={orderInfo.paymentMethod === 'paypay'}
                      onChange={() => onChange({ paymentMethod: 'paypay' })}
                      className="sr-only"
                    />
                    <div className="flex items-center">
                      <Wallet className="w-5 h-5 mr-3" />
                      <div>
                        <span className="font-medium">PayPay QR</span>
                        <p className="text-xs text-gray-500">Pay with your PayPay app</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  {products.map(product => (
                    <div key={product.id} className="flex justify-between">
                      <span>{product.name} × {product.quantity}</span>
                      <span>¥{(product.price * product.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>¥{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-sm bg-gray-100 p-3 rounded-md">
                  <p><strong>Time Slot:</strong> {timeSlot.date}, {timeSlot.time}</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </motion.div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-10">
        <div className="container-custom">
          <div className="flex justify-between items-center">
            <button 
              className="btn btn-outline"
              onClick={onBack}
              type="button"
            >
              Back
            </button>
            
            <button 
              className={`btn btn-primary ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleSubmit}
              disabled={!isFormValid}
              type="button"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
      
      <PaymentModal 
        isOpen={showPaymentModal} 
        onClose={() => setShowPaymentModal(false)}
        onComplete={() => navigate('/reserve/complete')}
        amount={totalPrice}
      />
    </div>
  );
};

export default InfoPayment;