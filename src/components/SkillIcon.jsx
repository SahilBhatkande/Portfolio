import React from 'react';
import { motion } from 'framer-motion';

const SkillIcon = ({ name, icon }) => {
  return (
    <motion.div
      className="flex flex-col items-center p-2 sm:p-4 glass-card w-full max-w-[80px] sm:max-w-[96px] md:max-w-[112px]"
      whileHover={{ y: -5, scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <img 
        src={`/icons/${icon}`} 
        alt={name} 
        className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mb-2 opacity-80 group-hover:opacity-100 object-contain"
      />
      <p className="text-sm text-[#8F9BB7] group-hover:text-[#00F0FF]">{name}</p>
    </motion.div>
  );
};

export default SkillIcon; 