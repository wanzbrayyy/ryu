import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      }
    },
    exit: { 
      y: "-100vh",
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1.5,
      }
    }
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const loadingText = "LOADING_SYSTEM...";
  const loadingChars = Array.from(loadingText);

  const charVariants = {
    hidden: { opacity: 0 },
    visible: i => ({
      opacity: 1,
      transition: {
        delay: i * 0.05 + 0.5
      }
    })
  };

  return (
    <motion.div
      key="loading-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      <div className="relative w-32 h-32 mb-8">
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute w-full h-full border-2 border-primary/30 rounded-full"></div>
          <div className="absolute w-2/3 h-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-primary/40 rounded-full animate-spin [animation-duration:6s] [animation-direction:reverse]"></div>
        </motion.div>
        <motion.div
          variants={iconVariants}
          className="w-full h-full bg-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg shadow-primary/50"
        >
          <span className="text-primary-foreground font-bold text-6xl main-title-font">R</span>
        </motion.div>
      </div>
      
      <motion.h1 
        variants={textVariants}
        className="text-4xl font-bold main-title-font primary-text text-glow mb-4"
      >
        RYU STORE
      </motion.h1>

      <motion.div className="flex font-mono text-sm tracking-widest text-primary/70">
        {loadingChars.map((char, index) => (
          <motion.span key={index} custom={index} variants={charVariants}>
            {char}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;