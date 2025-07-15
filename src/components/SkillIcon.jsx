import React from 'react';
import { motion } from 'framer-motion';

const SkillIcon = ({ name, icon }) => {
  return (
    <motion.div
      className="flex flex-col items-center p-4 glass-card"
      whileHover={{ y: -5, scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <img 
        src={`/icons/${icon}`} 
        alt={name} 
        className="w-12 h-12 mb-2 opacity-80 group-hover:opacity-100"
      />
      <p className="text-sm text-[#8F9BB7] group-hover:text-[#00F0FF]">{name}</p>
    </motion.div>
  );
};

export default SkillIcon; 