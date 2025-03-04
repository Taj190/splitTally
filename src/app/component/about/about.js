import { motion } from 'framer-motion';

import './about.css'; // Import the CSS file
import { useRouter } from 'next/navigation';

const AboutSection = () => {
  const router = useRouter();

  // Feature data
  const features = [
    {
      icon: '👥',
      title: 'Create Groups',
      description: 'Easily create groups and add members for shared expenses.',
    },
    {
      icon: '🔒',
      title: 'Privacy Mode',
      description: 'Verify transactions with privacy mode for added security.',
    },
    {
      icon: '📊',
      title: 'Expense Tracking',
      description: 'Track expenses with pie charts and bar graphs.',
    },
    {
      icon: '💸',
      title: 'Automated Calculations',
      description: 'Know who owes whom after every transaction.',
    },
    {
      icon: '📈',
      title: 'Monthly Reports',
      description: 'Get detailed expense reports powered by DeepSeek.',
    },
  ];

  return (
    <div className="about-section py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-white mb-8"
        >
          What is SplitTally?
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
        >
          SplitTally is a hassle-free platform for managing shared expenses. Create groups, track expenses, and ensure transparency with features like privacy mode, automated calculations, and monthly reports powered by DeepSeek.
        </motion.p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/signup')} // Redirect to signup
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          Invite Friends
        </motion.button>
      </div>
    </div>
  );
};

export default AboutSection;