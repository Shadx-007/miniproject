'use client';

import { motion } from 'framer-motion';
import { Wifi, Cpu, Cloud, Cpu as Brain, BarChart3 } from 'lucide-react';

const steps = [
  {
    icon: Wifi,
    label: 'Sensor',
    description: 'IoT sensors collect data',
  },
  {
    icon: Cpu,
    label: 'Device',
    description: 'Process at edge',
  },
  {
    icon: Cloud,
    label: 'Cloud',
    description: 'Centralized analysis',
  },
  {
    icon: Brain,
    label: 'AI',
    description: 'Threat detection',
  },
  {
    icon: BarChart3,
    label: 'Dashboard',
    description: 'Real-time insights',
  },
];

export default function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="how-it-works" className="py-24 bg-black px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A seamless flow from sensors to intelligent threat detection and response
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-2 md:gap-4"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div key={index} variants={itemVariants} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center mb-3 hover:border-blue-600 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-blue-500" />
                  </div>
                  <p className="text-white font-semibold text-sm text-center">
                    {step.label}
                  </p>
                  <p className="text-gray-400 text-xs text-center mt-1 max-w-20">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block">
                    <motion.div
                      animate={{ x: [0, 8, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mx-4 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-transparent"
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
