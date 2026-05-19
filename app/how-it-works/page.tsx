'use client';

import Navbar from '@/components/navbar';
import { ArrowDown, Radio, Cloud, Brain, BarChart3, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '@/components/footer';

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Radio,
      title: 'Data Collection',
      description: 'IoT devices and sensors send real-time data to our secure cloud infrastructure. We collect millions of data points from your network every second.',
    },
    {
      icon: Cloud,
      title: 'Cloud Processing',
      description: 'Data flows through our distributed processing pipeline with advanced filtering and enrichment. Sensitive data is encrypted end-to-end.',
    },
    {
      icon: Brain,
      title: 'AI Analysis',
      description: 'Our machine learning models analyze patterns, detect anomalies, and identify potential threats in real-time using advanced algorithms.',
    },
    {
      icon: BarChart3,
      title: 'Intelligence',
      description: 'Actionable insights are generated and presented through our intuitive dashboard with recommendations for remediation.',
    },
    {
      icon: CheckCircle,
      title: 'Response',
      description: 'Automated response triggers protect your infrastructure instantly. Manual controls available for complex scenarios.',
    },
  ];

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">How AI Security Works</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A sophisticated yet intuitive system that protects your IoT infrastructure 24/7
            </p>
          </motion.div>

          {/* Process Flow */}
          <div className="space-y-12 max-w-4xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className={`flex items-center gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                          <span className="font-bold text-blue-400">{index + 1}</span>
                        </div>
                        <h3 className="text-2xl font-bold">{step.title}</h3>
                      </div>
                      <p className="text-gray-400 text-lg leading-relaxed">{step.description}</p>
                    </div>

                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600/20 to-blue-600/10 flex items-center justify-center border border-blue-500/30">
                        <Icon className="w-12 h-12 text-blue-400" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="flex justify-center py-8"
                    >
                      <ArrowDown className="w-6 h-6 text-blue-400 animate-bounce" />
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-black via-gray-900/10 to-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Enterprise Architecture</h2>
            <p className="text-lg text-gray-400">Built on a foundation of security, scalability, and reliability</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'High Availability', items: ['99.99% uptime SLA', 'Multi-region redundancy', 'Auto-failover systems'] },
              { title: 'Scalability', items: ['Handles millions of events', 'Dynamic resource allocation', 'No performance degradation'] },
              { title: 'Security', items: ['End-to-end encryption', 'Zero-trust architecture', 'Compliance certified'] },
              { title: 'Performance', items: ['Sub-second latency', 'Real-time processing', 'Optimized throughput'] },
              { title: 'Monitoring', items: ['Advanced logging', 'Comprehensive metrics', 'Health dashboards'] },
              { title: 'Integration', items: ['REST API', 'Webhook support', 'Custom connectors'] },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-blue-500/50 transition-colors"
              >
                <h4 className="text-lg font-bold mb-4 text-blue-400">{item.title}</h4>
                <ul className="space-y-2">
                  {item.items.map((subitem, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      {subitem}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Implementation Timeline</h2>
            <p className="text-lg text-gray-400">Quick deployment from day one</p>
          </motion.div>

          <div className="space-y-6">
            {[
              { phase: 'Day 1-2', title: 'Setup & Configuration', description: 'Onboarding and initial system setup with your team' },
              { phase: 'Day 3-5', title: 'Integration', description: 'Connect your IoT devices and data sources' },
              { phase: 'Day 6-7', title: 'Training', description: 'Team training on platform usage and best practices' },
              { phase: 'Day 8+', title: 'Live Monitoring', description: 'Full operational deployment with 24/7 support' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start bg-gray-900/30 border border-gray-800 rounded-lg p-6"
              >
                <div className="w-16 h-16 rounded-lg bg-blue-600/20 flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                  <span className="font-bold text-blue-400">{item.phase}</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
