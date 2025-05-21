import { motion } from 'framer-motion';

const ThemeToggle = ({ toggleTheme, isDark }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-20 bg-blue-600 text-white px-4 py-2 rounded-full"
    >
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </motion.button>
  );
};

export default ThemeToggle;