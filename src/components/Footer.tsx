import React from 'react';
import { Instagram, Atom as Tiktok } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-6 mt-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} ポテちゃんポテトフェス
            </p>
            <p className="text-xs text-gray-500 mt-1">
              開催日：2025年8月9日～11日 幕張メッセ
            </p>
          </div>
          
          <div className="flex gap-4">
            <a 
              href="#" 
              className="p-2 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="p-2 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
              aria-label="TikTok"
            >
              <Tiktok className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;