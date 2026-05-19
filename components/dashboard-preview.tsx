'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="py-24 bg-black px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Dashboard Preview
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get a glimpse of our intuitive control center
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="border border-gray-800 rounded-lg overflow-hidden shadow-2xl shadow-blue-500/5 bg-gray-950"
        >
          {/* Dashboard Header */}
          <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
            <h3 className="text-white font-semibold">Security Dashboard</h3>
            <div className="text-gray-400 text-sm">Live Monitoring</div>
          </div>

          {/* Dashboard Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Risk Score Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm font-medium">Risk Score</p>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-white mb-2">12</p>
                <p className="text-gray-500 text-sm">Low Risk - All Systems Safe</p>
              </motion.div>

              {/* Active Alerts Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm font-medium">Active Alerts</p>
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-white mb-2">3</p>
                <p className="text-gray-500 text-sm">Investigating</p>
              </motion.div>

              {/* Protected Devices Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm font-medium">Protected Devices</p>
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-white mb-2">2,847</p>
                <p className="text-gray-500 text-sm">Connected & Secure</p>
              </motion.div>
            </div>

            {/* Activity Logs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-white font-semibold mb-4">Recent Activity</h4>
              <div className="space-y-3">
                {[
                  { time: '14:23', event: 'Unusual access attempt blocked', type: 'alert' },
                  { time: '14:18', event: 'Device firmware updated successfully', type: 'success' },
                  { time: '14:05', event: 'Network anomaly detected and resolved', type: 'alert' },
                  { time: '13:42', event: 'Backup completed successfully', type: 'success' },
                ].map((log, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-900 rounded border border-gray-800">
                    {log.type === 'alert' ? (
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-300 text-sm">{log.event}</p>
                      <p className="text-gray-500 text-xs mt-1">{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
