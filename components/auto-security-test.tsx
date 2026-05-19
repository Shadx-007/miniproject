'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, CheckCircle, Clock4, Zap, ChevronDown } from 'lucide-react';
import IncidentTimeline from './incident-timeline';

interface TestResult {
  status: 'Normal' | 'Medium' | 'High';
  severity: string;
  message: string;
  anomalyDetected: boolean;
  timestamp: string;
  failedLogins: number;
  requestsPerMinute: number;
  mitigation?: string;
  attackType: string;
  timeline?: {
    detection: number;
    response: number;
    completion: number;
  };
}

const ATTACK_TYPES = [
  'Brute Force Attack',
  'Traffic Spike (DDoS)',
  'Suspicious Device Activity',
];

export default function AutoSecurityTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<TestResult | null>(null);
  const [testHistory, setTestHistory] = useState<TestResult[]>([]);
  const [selectedAttackType, setSelectedAttackType] = useState<string>('Brute Force Attack');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAnimatingTimeline, setIsAnimatingTimeline] = useState(false);

  const generateRealisticData = (attackType: string) => {
    switch (attackType) {
      case 'Brute Force Attack':
        return {
          failedLogins: Math.floor(Math.random() * 15) + 5, // 5-20
          requestsPerMinute: Math.floor(Math.random() * 800) + 200, // 200-1000
        };
      case 'Traffic Spike (DDoS)':
        return {
          failedLogins: Math.floor(Math.random() * 3),
          requestsPerMinute: Math.floor(Math.random() * 2000) + 1500, // 1500-3500
        };
      case 'Suspicious Device Activity':
        return {
          failedLogins: Math.floor(Math.random() * 5),
          requestsPerMinute: Math.floor(Math.random() * 500) + 300,
        };
      default:
        return {
          failedLogins: Math.floor(Math.random() * 15) + 1,
          requestsPerMinute: Math.floor(Math.random() * 2900) + 100,
        };
    }
  };

  const runSecurityTest = async () => {
    setIsLoading(true);
    setError(null);
    setIsAnimatingTimeline(true);

    try {
      const randomData = generateRealisticData(selectedAttackType);

      const response = await fetch('/api/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          attackType: selectedAttackType,
          ...randomData,
        }),
      });

      if (!response.ok) throw new Error('Failed to run security test');

      const result = await response.json();
      const testResult: TestResult = {
        ...result,
        failedLogins: randomData.failedLogins,
        requestsPerMinute: randomData.requestsPerMinute,
      };

      setLastResult(testResult);
      setTestHistory([testResult, ...testHistory.slice(0, 9)]);

      // Add alert if anomaly detected
      if (testResult.anomalyDetected) {
        await addAlert(testResult);
      }

      // Stop animation after timelines finish
      if (testResult.timeline) {
        const totalTime = (testResult.timeline.detection + testResult.timeline.response + testResult.timeline.completion) * 1000;
        setTimeout(() => setIsAnimatingTimeline(false), totalTime);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsAnimatingTimeline(false);
    } finally {
      setIsLoading(false);
    }
  };

  const addAlert = async (result: TestResult) => {
    try {
      const newAlert = {
        id: Date.now(),
        type: result.attackType,
        severity: result.severity,
        status: 'Resolved', // Auto-fixed by system
        time: new Date().toLocaleString(),
        device: 'System Monitor',
        fix: result.mitigation,
      };

      // Store in localStorage to persist between page reloads
      const existingAlerts = localStorage.getItem('simulatedAlerts');
      const alerts = existingAlerts ? JSON.parse(existingAlerts) : [];
      alerts.unshift(newAlert);
      localStorage.setItem('simulatedAlerts', JSON.stringify(alerts));
    } catch (err) {
      console.error('Failed to add alert:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'High':
        return 'bg-red-900 border-red-700';
      case 'Medium':
        return 'bg-yellow-900 border-yellow-700';
      default:
        return 'bg-green-900 border-green-700';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'High':
        return 'text-red-200';
      case 'Medium':
        return 'text-yellow-200';
      default:
        return 'text-green-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'High':
        return <AlertTriangle className="w-6 h-6" />;
      case 'Medium':
        return <AlertTriangle className="w-6 h-6" />;
      default:
        return <CheckCircle className="w-6 h-6" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gray-900/40 border border-gray-800 rounded-lg overflow-hidden"
    >
      <div className="border-b border-gray-800 px-6 py-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-400" />
          Auto Security Test
        </h3>
      </div>

      <div className="p-6">
        {/* Attack Type Selector */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-400 mb-2">Select Attack Type</label>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 text-left flex items-center justify-between hover:border-gray-600 transition-colors"
            >
              <span className="text-sm">{selectedAttackType}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden z-10 shadow-lg"
              >
                {ATTACK_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedAttackType(type);
                      setDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-sm text-left transition-colors ${
                      selectedAttackType === type
                        ? 'bg-blue-900 text-blue-300'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Test Button */}
        <motion.button
          onClick={runSecurityTest}
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 mb-6"
        >
          {isLoading ? (
            <>
              <div className="animate-spin"><Activity className="w-5 h-5" /></div>
              Running security test...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Run Auto Security Test
            </>
          )}
        </motion.button>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {/* Last Result */}
        {lastResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mb-6 p-4 border rounded-lg ${getStatusColor(lastResult.status)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={getStatusTextColor(lastResult.status)}>
                  {getStatusIcon(lastResult.status)}
                </div>
                <div>
                  <p className={`font-bold ${getStatusTextColor(lastResult.status)}`}>
                    Status: {lastResult.status}
                  </p>
                  <p className="text-gray-300 text-sm">{lastResult.message}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock4 className="w-3 h-3" />
                {new Date(lastResult.timestamp).toLocaleTimeString()}
              </span>
            </div>

            <div className="mt-4 p-3 bg-gray-900/50 rounded border border-gray-700">
              <p className="text-xs text-gray-400 mb-2">Test Parameters:</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Failed Logins:</span>
                  <p className="text-blue-400 font-mono">{lastResult.failedLogins}</p>
                </div>
                <div>
                  <span className="text-gray-400">Requests/Min:</span>
                  <p className="text-blue-400 font-mono">{lastResult.requestsPerMinute}</p>
                </div>
              </div>
            </div>

            {lastResult.anomalyDetected && lastResult.mitigation && (
              <div className="mt-4 p-3 bg-green-900/30 border border-green-700 rounded">
                <p className="text-xs font-semibold text-green-300 mb-1">✓ Fix Applied</p>
                <p className="text-xs text-green-200">{lastResult.mitigation}</p>
              </div>
            )}

            {/* Incident Response Timeline */}
            {lastResult.timeline && (
              <IncidentTimeline 
                timeline={lastResult.timeline} 
                isAnimating={isAnimatingTimeline}
              />
            )}
          </motion.div>
        )}

        {/* Test History */}
        {testHistory.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Activity Log
            </h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {testHistory.map((test, index) => (
                <motion.div
                  key={`${test.timestamp}-${index}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 bg-gray-900/30 border border-gray-700 rounded text-xs hover:bg-gray-900/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${test.status === 'High' ? 'bg-red-500' : test.status === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                      <span className="text-gray-300 font-medium text-xs">
                        {test.attackType}
                      </span>
                    </div>
                    <span className="text-gray-500 text-xs">
                      {new Date(test.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-400 ml-4 text-xs mb-1">
                    {test.anomalyDetected ? `${test.status} Severity` : 'Normal'} • Logins: {test.failedLogins}, Req/min: {test.requestsPerMinute}
                  </p>
                  {test.mitigation && (
                    <p className="text-green-300 ml-4 text-xs">✓ {test.mitigation}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {testHistory.length === 0 && !lastResult && (
          <div className="text-center text-gray-400 py-8">
            <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Click the button above to run your first security test</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
