'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Lightbulb, AlertTriangle } from 'lucide-react';

export default function AIDecisionPanel() {
  const [threatDetected, setThreatDetected] = useState(true);
  const [confidence, setConfidence] = useState(87);
  const [analysis, setAnalysis] = useState(
    'Multiple failed login attempts detected from IP 192.168.1.50. Device fingerprint analysis indicates compromised device. Geolocation data conflicts with historical patterns.'
  );
  const [suggestedFix, setSuggestedFix] = useState(
    'Block source IP, isolate device, force password reset, initiate 2FA verification'
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setConfidence((prev) => Math.min(100, prev + Math.random() * 5));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
    >
      {/* AI Threat Analysis */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-lg overflow-hidden">
        <div className="border-b border-gray-800 px-6 py-4 flex items-center gap-3">
          <Brain className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-bold">AI Threat Analysis</h2>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-gray-300">Threat Detected</p>
              <motion.div
                animate={{ scale: threatDetected ? 1.1 : 1 }}
                className={`w-3 h-3 rounded-full ${threatDetected ? 'bg-red-500' : 'bg-green-500'}`}
              ></motion.div>
            </div>
            <p className="text-lg font-bold">{threatDetected ? 'YES - HIGH PRIORITY' : 'NO THREAT'}</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-gray-300">Confidence Level</p>
              <p className="text-lg font-bold text-orange-400">{Math.round(confidence)}%</p>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                className="bg-orange-500 h-2 rounded-full"
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-xs font-semibold text-gray-400 mb-2">Model Analysis</p>
            <p className="text-sm text-gray-300 leading-relaxed">{analysis}</p>
          </div>
        </div>
      </div>

      {/* Suggested Fix */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-lg overflow-hidden">
        <div className="border-b border-gray-800 px-6 py-4 flex items-center gap-3">
          <Lightbulb className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-bold">Suggested Fix</h2>
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {suggestedFix.split(',').map((fix, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex items-start gap-3 p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg"
              >
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
                <p className="text-sm text-gray-300">{fix.trim()}</p>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-6 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm transition-colors"
          >
            Apply Fix Automatically
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
