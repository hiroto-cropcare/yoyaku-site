import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ItemSelector from '../components/reservation/ItemSelector';
import TimeSlotSelector from '../components/reservation/TimeSlotSelector';
import InfoPayment from '../components/reservation/InfoPayment';
import ReservationStepper from '../components/reservation/ReservationStepper';
import { Product, TimeSlot, OrderInfo } from '../types';
import { productData } from '../data/products';
import { timeSlots } from '../data/timeSlots';

const ReservationPage: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>(productData.map(p => ({ ...p, quantity: 0 })));
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    name: '',
    phone: '',
    email: '',
    paymentMethod: 'card'
  });

  const handleProductChange = (productId: number, quantity: number) => {
    setSelectedProducts(
      selectedProducts.map(product => 
        product.id === productId ? { ...product, quantity } : product
      )
    );
  };

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedTimeSlot(slot);
  };

  const handleOrderInfoChange = (info: Partial<OrderInfo>) => {
    setOrderInfo({ ...orderInfo, ...info });
  };

  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 3));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSelectedProductsCount = () => {
    return selectedProducts.reduce((sum, product) => sum + product.quantity, 0);
  };

  const getTotalPrice = () => {
    return selectedProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  };

  const canProceedToTimeSlot = getSelectedProductsCount() > 0;
  const canProceedToInfo = selectedTimeSlot !== null;

  return (
    <div className="pt-16 pb-24">
      <div className="container-custom py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ReservationStepper currentStep={step} />

          <div className="mt-8">
            {step === 1 && (
              <ItemSelector 
                products={selectedProducts} 
                onProductChange={handleProductChange} 
                onNext={nextStep}
                canProceed={canProceedToTimeSlot}
                totalPrice={getTotalPrice()}
              />
            )}
            
            {step === 2 && (
              <TimeSlotSelector 
                slots={timeSlots} 
                selectedSlot={selectedTimeSlot} 
                onSelect={handleTimeSlotSelect}
                onNext={nextStep}
                onBack={prevStep}
                canProceed={canProceedToInfo}
              />
            )}
            
            {step === 3 && (
              <InfoPayment 
                orderInfo={orderInfo}
                onChange={handleOrderInfoChange}
                products={selectedProducts.filter(p => p.quantity > 0)}
                timeSlot={selectedTimeSlot!}
                totalPrice={getTotalPrice()}
                onBack={prevStep}
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReservationPage;