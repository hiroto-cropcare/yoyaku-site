import React from 'react';
import { motion } from 'framer-motion';

interface ReservationStepperProps {
  currentStep: number;
}

const ReservationStepper: React.FC<ReservationStepperProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, title: 'Items' },
    { number: 2, title: 'Time Slot' },
    { number: 3, title: 'Info & Pay' }
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
        
        {/* Completed Line */}
        <motion.div 
          className="absolute top-5 left-0 h-0.5 bg-primary -z-10"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep - 1) * 50}%` }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Step Indicators */}
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            <motion.div 
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                step.number <= currentStep
                  ? 'bg-primary text-black'
                  : 'bg-gray-200 text-gray-500'
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              {step.number}
            </motion.div>
            <span className={`mt-2 text-sm font-medium ${
              step.number <= currentStep ? 'text-black' : 'text-gray-500'
            }`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationStepper;