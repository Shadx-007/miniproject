'use client';

import Navbar from '@/components/navbar';
import { Shield, Radio, Lock, Eye, Bell, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '@/components/footer';

export default function FeaturesPage() {
  const features = [
    {
      icon: Shield,
      title: 'AI-Powered Detection',
      description: 'Advanced machine learning algorithms detect threats in real-time, identifying anomalies across your entire network infrastructure.',
    },
    {
      icon: Radio,
      title: 'IoT Integration',
      description: 'Seamless integration with thousands of IoT devices and sensors for comprehensive network visibility and control.',
    },
    {
      icon: Lock,
      title: 'Enterprise Protection',
      description: 'Military-grade encryption and enterprise-level security controls to protect your most critical infrastructure.',
    },
    {
      icon: Eye,
      title: 'Zero Trust Security',
      description: 'Never trust, always verify. Continuous authentication and authorization across all network segments.',
    },
    {
      icon: Bell,
      title: 'Live Monitoring',
      description: 'Real-time dashboards with instant notifications for security events and system anomalies.',
    },
    {
      icon: Zap,
      title: 'Instant Alerts',
      description: 'Get alerted instantly to critical security events with actionable intelligence and remediation guidance.',
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
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Powerful Security Features
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to protect your IoT infrastructure with AI-powered intelligence
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-blue-500/50 rounded-xl p-8 transition-all duration-300"
                >
                  <div className="mb-4 w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-black via-black to-gray-900/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Advanced Capabilities</h2>
            <p className="text-lg text-gray-400">Take security to the next level with our enterprise features</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                title: 'Predictive Threat Analysis',
                items: [
                  'Machine learning-based threat prediction',
                  'Behavioral analysis and anomaly detection',
                  'Historical pattern recognition',
                  'Proactive vulnerability assessment',
                ],
              },
              {
                title: 'Compliance & Reporting',
                items: [
                  'HIPAA, GDPR, and PCI-DSS compliant',
                  'Automated compliance reporting',
                  'Audit trails and forensic analysis',
                  'Custom compliance frameworks',
                ],
              },
              {
                title: 'Integration & API',
                items: [
                  'RESTful API for custom integrations',
                  'SIEM platform compatibility',
                  'Webhook support for automation',
                  'Third-party tool integration',
                ],
              },
              {
                title: 'Support & Training',
                items: [
                  '24/7 enterprise support',
                  'Dedicated security team',
                  'Training and onboarding programs',
                  'Regular security audits',
                ],
              },
            ].map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-8"
              >
                <h3 className="text-2xl font-bold mb-6 text-blue-400">{capability.title}</h3>
                <ul className="space-y-4">
                  {capability.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
