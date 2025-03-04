import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

const PhotoLoopComponent = () => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const controls = useAnimation();

  const photos = [
    '/login.png',
    '/dashboard.png',
    '/group.png',
    '/groupnavbar.png',
    '/piechart.png',
    '/settlement.png',
    '/reportdetail.png',
    '/reportdetail_2.png',
  ];

  const captions = [
    'Login to Your Account',
    'Your Dashboard at a Glance',
    'Create or Manage Groups with Ease',
    'Navigate Your Group Activities',
    'Visualize Expenses with Pie Charts',
    'Settle Up Hassle-Free',
    'Detailed Expense Reports',
    'Smart Suggestions for Better Spending',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [photos.length]);

  useEffect(() => {
    controls.start({
      opacity: 1,
      rotate: Math.random() * 10 - 5, // Less extreme rotation
      transition: { duration: 1 },
    });
  }, [currentPhoto, controls]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 p-4">
      <div className="w-full max-w-4xl bg-white/20 backdrop-blur-md rounded-lg shadow-2xl p-6 md:p-8 text-center">
        {/* Catchy Text */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-white mb-6"
        >
          {captions[currentPhoto]}
        </motion.h2>

        {/* Photo Loop with Fixes */}
        <div key={currentPhoto} className="relative w-full aspect-[16/9] sm:aspect-[4/3] overflow-hidden rounded-lg">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentPhoto}
              src={photos[currentPhoto]}
              alt={`Step ${currentPhoto + 1}`}
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full object-contain rounded-lg shadow-lg"
            />
          </AnimatePresence>
        </div>

        {/* Dots for Navigation */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhoto(index)}
              className={`w-3 h-3 rounded-full ${
                currentPhoto === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoLoopComponent;
