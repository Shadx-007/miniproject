'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Brain, Lock, Activity, AlertCircle } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Detection',
    description: 'Machine learning algorithms analyze patterns to detect threats in real-time',
  },
  {
    icon: Zap,
    title: 'IoT Integration',
    description: 'Seamless integration with thousands of IoT devices across your network',
  },
  {
    icon: Shield,
    title: 'Enterprise Protection',
    description: 'Military-grade encryption and multi-layer security protocols',
  },
  {
    icon: Lock,
    title: 'Zero Trust Architecture',
    description: 'Never trust, always verify with continuous authentication',
  },
  {
    icon: Activity,
    title: 'Live Monitoring',
    description: 'Real-time dashboard with detailed analytics and insights',
  },
  {
    icon: AlertCircle,
    title: 'Instant Alerts',
    description: 'Immediate notifications for suspicious activities and anomalies',
  },
];

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="features" className="py-24 bg-black px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need for comprehensive cybersecurity across your IoT infrastructure
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors duration-300 hover:shadow-lg hover:shadow-blue-500/5"
              >
                <Icon className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-white font-semibold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
