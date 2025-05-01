import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
}

// Animation variants
const pageVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

// Children animation variants
const childVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

export const PageTransition = ({ children }: PageTransitionProps): JSX.Element => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
      className="w-full"
    >
      {/* Wrap direct children in motion.div elements for staggered animation */}
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={childVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={childVariants}>{children}</motion.div>
      )}
    </motion.div>
  );
}; 