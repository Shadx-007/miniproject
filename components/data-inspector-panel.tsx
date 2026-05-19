'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Copy, CheckCircle } from 'lucide-react';

export default function DataInspectorPanel() {
  const [activeTab, setActiveTab] = useState<'request' | 'response'>('request');
  const [copied, setCopied] = useState(false);

  const requestData = {
    endpoint: '/api/analyze',
    method: 'POST',
    timestamp: new Date().toISOString(),
    payload: {
      threat_type: 'brute_force',
      source_ip: '192.168.1.50',
      failed_attempts: 15,
      time_window: 60,
      target_user: 'admin',
      device_id: 'DEV-001',
      severity_level: 'high',
      confidence_score: 0.87,
    },
  };

  const responseData = {
    status: 200,
    timestamp: new Date().toISOString(),
    processing_time_ms: 245,
    result: {
      threat_detected: true,
      threat_type: 'credential_attack',
      confidence: 0.92,
      recommended_action: 'block_and_isolate',
      actions_taken: [
        'IP_blocked',
        'device_isolated',
        'sessions_terminated',
        'password_reset_forced',
      ],
      execution_time_ms: 340,
    },
  };

  const dataToShow = activeTab === 'request' ? requestData : responseData;
  const jsonString = JSON.stringify(dataToShow, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gray-900/60 border border-gray-800 rounded-lg overflow-hidden mb-8"
    >
      <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Code className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-bold">Data Inspector</h2>
        </div>
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs font-medium flex items-center gap-1 transition-colors"
        >
          {copied ? (
            <>
              <CheckCircle className="w-3 h-3 text-green-400" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy JSON
            </>
          )}
        </motion.button>
      </div>

      <div className="flex border-b border-gray-800">
        {(['request', 'response'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-black/50 p-6 overflow-x-auto">
        <pre className="font-mono text-xs text-gray-300 whitespace-pre-wrap break-words max-h-96 overflow-y-auto">
          {jsonString}
        </pre>
      </div>

      <div className="px-6 py-3 bg-gray-900/30 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
        <span>
          {activeTab === 'request'
            ? 'Request payload sent to backend'
            : 'Response received from backend'}
        </span>
        <span className="text-green-400">Connection: OK</span>
      </div>
    </motion.div>
  );
}
