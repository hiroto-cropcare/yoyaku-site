import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import OrderSummaryBar from './OrderSummaryBar';
import { Product } from '../../types';

interface ItemSelectorProps {
  products: Product[];
  onProductChange: (productId: number, quantity: number) => void;
  onNext: () => void;
  canProceed: boolean;
  totalPrice: number;
}

const ItemSelector: React.FC<ItemSelectorProps> = ({ 
  products, 
  onProductChange, 
  onNext,
  canProceed,
  totalPrice
}) => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-2">商品を選択</h1>
        <p className="text-gray-600 mb-6">フェス限定の特製ポテトから選んでください。</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onChange={onProductChange}
            />
          ))}
        </div>
      </motion.div>
      
      <OrderSummaryBar
        totalPrice={totalPrice}
        onNext={onNext}
        canProceed={canProceed}
        nextLabel="次へ：時間選択"
      />
    </div>
  );
};

export default ItemSelector