import React, { Suspense } from 'react';
import { motion } from 'framer-motion';

const SplineScene = ({ scene = "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" }) => {
  return (
    <div className="w-full h-full relative">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full"
          />
        </div>
      }>
        <iframe
          src={scene}
          frameBorder="0"
          width="100%"
          height="100%"
          className="rounded-lg"
          title="Spline 3D Scene"
        />
      </Suspense>
    </div>
  );
};

export default SplineScene;