export const springTransition = {
  type: "spring",
  stiffness: 400,
  damping: 30
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

// Reduced motion fallback helper
export const getTransition = (reducedMotion: boolean) => 
  reducedMotion ? { duration: 0 } : springTransition;