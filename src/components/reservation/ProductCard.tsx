import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onChange: (productId: number, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onChange }) => {
  const handleDecrease = () => {
    if (product.quantity > 0) {
      onChange(product.id, product.quantity - 1);
    }
  };

  const handleIncrease = () => {
    onChange(product.id, product.quantity + 1);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card overflow-hidden"
    >
      <div className="relative h-48 -mx-4 -mt-4 mb-4 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-primary px-2 py-1 rounded-md font-bold text-black shadow-md">
          ¥{product.price.toLocaleString()}
        </div>
      </div>
      
      <h3 className="text-lg font-bold mb-1">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-4">{product.description}</p>
      
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              product.quantity > 0 
              ? 'bg-accent text-white' 
              : 'bg-gray-200 text-gray-400'
            }`}
            onClick={handleDecrease}
            disabled={product.quantity === 0}
          >
            <Minus className="w-4 h-4" />
          </motion.button>
          
          <span className="w-10 text-center font-medium">
            {product.quantity}
          </span>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center"
            onClick={handleIncrease}
          >
            <Plus className="w-4 h-4" />
          </motion.button>
        </div>
        
        <div className="text-right">
          <span className={`text-sm ${product.quantity > 0 ? 'text-black font-medium' : 'text-gray-400'}`}>
            {product.quantity > 0 
              ? `¥${(product.price * product.quantity).toLocaleString()}` 
              : 'Select quantity'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;