import { motion } from 'motion/react';

export const Button = ({ text, children, className, ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 1, y: 1 }}
      trasnsition={{ type: "spring", stiffness: 2 }}
      {...props}
      className={`cursor-pointer font-sans regular text-sm leading-5 text-center w-fit whitespace-nowrap px-4 py-2 ${className ? className : "text-bg bg-accent"} rounded-sm`}
    >
      {text}
      {children}
    </motion.button>
  );
};
