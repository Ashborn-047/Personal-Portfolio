import React from 'react';
import { motion } from 'framer-motion';

interface UiverseCardProps {
  title?: string;
  subtitle?: string;
  year?: string;
  brand?: string;
  brandSubtitle?: string;
  onClick?: () => void;
}

const UiverseCard: React.FC<UiverseCardProps> = ({
  title = 'Card',
  subtitle = 'text',
  year = '2025',
  brand = 'UIverse',
  brandSubtitle = 'card',
  onClick,
}) => {
  return (
    <div className="w-[200px] h-[300px] relative border border-solid border-white/40 rounded-2xl overflow-hidden">
      {/* Background layer with purple and rounded shape */}
      <div className="w-full h-full p-1 absolute bg-purple-400">
        <div className="w-full h-full rounded-xl rounded-tr-[100px] rounded-br-[40px] bg-[#222]"></div>
      </div>

      {/* Middle layer with spinning gradient circle */}
      <div className="w-full h-full flex items-center justify-center relative backdrop-blur-lg rounded-2xl">
        <motion.div
          className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-500 to-orange-300"
          animate={{ rotate: 360 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Content layer */}
      <div className="w-full h-full p-2 flex justify-between absolute inset-0">
        {/* Left section */}
        <div className="w-3/5 p-2 pt-3 pb-1.5 flex flex-col rounded-xl backdrop-blur-lg bg-gray-50/10 text-gray-200 font-medium font-mono">
          <span className="text-xl font-medium">{title}</span>
          <span className="text-xs text-gray-400">{subtitle}</span>
          <div className="w-full mt-auto flex items-center justify-center">
            <span className="text-xs text-gray-400">{year}</span>
          </div>
        </div>

        {/* Right section */}
        <div className="h-full pt-2 flex flex-col items-end text-white/50">
          <span className="text-[10px] leading-[12px]">{brand}</span>
          <span className="text-[10px] leading-[13px]">{brandSubtitle}</span>
          <div
            className="w-8 h-8 mt-auto flex items-center justify-center rounded-full backdrop-blur-lg bg-gray-50/20 cursor-pointer transition-all duration-300 hover:bg-gray-50/30"
            onClick={onClick}
          >
            <span className="font-serif text-white/80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 12 12"
                className="w-4 h-4"
              >
                <g fill="none">
                  <path
                    d="M4.646 2.146a.5.5 0 0 0 0 .708L7.793 6L4.646 9.146a.5.5 0 1 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"
                    fill="currentColor"
                  />
                </g>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UiverseCard;

