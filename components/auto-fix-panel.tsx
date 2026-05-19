'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle, Clock } from 'lucide-react';

interface FixStep {
  label: string;
  status: 'completed' | 'in-progress' | 'pending';
  duration: number;
}

export default function AutoFixPanel() {
  const [fixSteps, setFixSteps] = useState<FixStep[]>([
    { label: 'Block source IP (192.168.1.50)', status: 'completed', duration: 0.2 },
    { label: 'Isolate compromised device', status: 'completed', duration: 0.3 },
    { label: 'Terminate active sessions', status: 'completed', duration: 0.1 },
    { label: 'Force password reset', status: 'in-progress', duration: 0.4 },
    { label: 'Enable 2FA verification', status: 'pending', duration: 0.5 },
    { label: 'Quarantine suspicious files', status: 'pending', duration: 0.3 },
  ]);

  const totalDuration = fixSteps.reduce((sum, step) => sum + step.duration, 0);
  const completedDuration = fixSteps
    .filter((step) => step.status === 'completed')
    .reduce((sum, step) => sum + step.duration, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gray-900/60 border border-gray-800 rounded-lg overflow-hidden mb-8"
    >
      <div className="border-b border-gray-800 px-6 py-4 flex items-center gap-3">
        <Zap className="w-6 h-6 text-yellow-400" />
        <h2 className="text-xl font-bold">Auto Fix Execution</h2>
        <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          {completedDuration.toFixed(1)}s / {totalDuration.toFixed(1)}s
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-gray-400">Overall Progress</p>
            <p className="text-sm font-bold text-blue-400">
              {Math.round((completedDuration / totalDuration) * 100)}%
            </p>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedDuration / totalDuration) * 100}%` }}
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
              transition={{ duration: 0.5 }}
            ></motion.div>
          </div>
        </div>

        <div className="space-y-3">
          {fixSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                step.status === 'completed'
                  ? 'bg-green-900/20 border-green-700/30'
                  : step.status === 'in-progress'
                    ? 'bg-blue-900/20 border-blue-700/30'
                    : 'bg-gray-800/30 border-gray-700/30'
              }`}
            >
              <div className="flex-shrink-0">
                {step.status === 'completed' ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : step.status === 'in-progress' ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                    <Zap className="w-5 h-5 text-blue-400" />
                  </motion.div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-600"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-300">{step.label}</p>
                <p className="text-xs text-gray-500">{step.duration.toFixed(2)}s</p>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: step.status === 'in-progress' ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 1, repeat: step.status === 'in-progress' ? Infinity : 0 }}
                className="w-2 h-2 rounded-full bg-blue-400"
              ></motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-green-900/20 border border-green-700/30 rounded-lg"
        >
          <p className="text-sm text-green-300 font-medium">
            System responded to threat in {completedDuration.toFixed(2)}s - Average response time: {(totalDuration / fixSteps.length).toFixed(2)}s
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
