import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-4">
      {/* Left Side */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex flex-col items-start space-y-6 md:space-y-8 p-4 md:p-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          SplitTally
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300">
          Transparency is all you want.
        </p>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
          Make groups while travelling or living in shared apartments, manage your expenses hassle-free, and ensure full transparency.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/signup')}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          GET STARTED
        </motion.button>
      </motion.div>

      {/* Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-1 hidden md:flex items-center justify-center p-4 md:p-8"
      >
        <div className="w-full h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-2xl p-6 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Hassle-Free Expense Splitting</h2>
          <p className="text-lg">
            Split bills, track expenses, and maintain transparency with your group effortlessly.
          </p>
        </div>
      </motion.div>

      {/* Mobile View: Right Side as a Column */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex-1 md:hidden w-full mt-8 p-4"
      >
        <div className="w-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-2xl p-6 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Hassle-Free Expense Splitting</h2>
          <p className="text-lg">
            Split bills, track expenses, and maintain transparency with your group effortlessly.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;