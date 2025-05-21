import React from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertCircle } from 'lucide-react';
import { TimeSlot } from '../../types';
import clsx from 'clsx';

interface TimeSlotSelectorProps {
  slots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSelect: (slot: TimeSlot) => void;
  onNext: () => void;
  onBack: () => void;
  canProceed: boolean;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  slots,
  selectedSlot,
  onSelect,
  onNext,
  onBack,
  canProceed
}) => {
  // Filter out past dates
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const validSlots = slots.filter(slot => {
    const slotDate = new Date(slot.date);
    return slotDate >= now;
  });

  // Group valid time slots by date
  const slotsByDate = validSlots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-2">時間を選択</h1>
        <p className="text-gray-600 mb-2">
          ご希望の来場時間を選んでください。
        </p>
        
        <div className="flex items-center bg-blue-50 text-blue-700 p-3 rounded-md mb-6">
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          <p className="text-sm">
            空き枠の多い時間帯は待ち時間が短くなります。
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <h3 className="font-bold text-lg mb-4">混雑状況</h3>
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-100 rounded-sm mr-2"></div>
              <span className="text-sm">空いている</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-100 rounded-sm mr-2"></div>
              <span className="text-sm">やや混雑</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-100 rounded-sm mr-2"></div>
              <span className="text-sm">混雑</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-200 rounded-sm mr-2"></div>
              <span className="text-sm">満席</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-8 mb-16">
          {Object.entries(slotsByDate).map(([date, dateSlots]) => (
            <div key={date} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-bold text-lg mb-4">{date}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {dateSlots.map(slot => {
                  const isSelected = selectedSlot?.id === slot.id;
                  const isFull = slot.availability === 'full';
                  
                  return (
                    <button
                      key={slot.id}
                      className={clsx(
                        "p-3 rounded-md text-center transition-all relative",
                        isFull ? "bg-gray-200 text-gray-500 cursor-not-allowed" :
                        isSelected ? "bg-accent text-white" : 
                        slot.availability === 'low' ? "bg-green-100 hover:bg-green-200" :
                        slot.availability === 'medium' ? "bg-yellow-100 hover:bg-yellow-200" :
                        "bg-orange-100 hover:bg-orange-200"
                      )}
                      onClick={() => !isFull && onSelect(slot)}
                      disabled={isFull}
                    >
                      <div className="flex items-center justify-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{slot.time}</span>
                      </div>
                      <div className="text-xs mt-1">
                        {isFull ? "満席" : slot.availability === 'low' ? "空いている" :
                         slot.availability === 'medium' ? "やや混雑" : "混雑"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-10">
        <div className="container-custom">
          <div className="flex justify-between items-center">
            <button 
              className="btn btn-outline"
              onClick={onBack}
            >
              戻る
            </button>
            
            <button 
              className={`btn btn-primary ${!canProceed ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={canProceed ? onNext : undefined}
              disabled={!canProceed}
            >
              次へ：お客様情報
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotSelector;