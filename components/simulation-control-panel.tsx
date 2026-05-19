'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Play, Settings, Sliders } from 'lucide-react';

interface SimulationConfig {
  attackType: string;
  intensity: number;
  targetDevice: string;
  duration: number;
}

interface StatusLog {
  timestamp: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
}

export default function SimulationControlPanel() {
  const [config, setConfig] = useState<SimulationConfig>({
    attackType: 'DDoS',
    intensity: 50,
    targetDevice: 'Server-01',
    duration: 60,
  });

  const [isRunning, setIsRunning] = useState(false);
  const [statusLogs, setStatusLogs] = useState<StatusLog[]>([
    { timestamp: '14:23:01', message: 'System initialized and ready', type: 'success' },
    { timestamp: '14:23:02', message: 'All sensors connected', type: 'info' },
  ]);

  const attackTypes = ['DDoS', 'Malware', 'Phishing', 'Intrusion'];
  const devices = ['Server-01', 'Server-02', 'Workstation-03', 'Router-01'];

  const handleRunSimulation = async () => {
    setIsRunning(true);
    addLog(`Starting ${config.attackType} simulation on ${config.targetDevice}`, 'info');
    
    // Simulate API call
    try {
      const response = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      }).catch(() => null);

      addLog(`Simulation configured: ${config.attackType} at ${config.intensity}% intensity`, 'success');
      addLog('Generating attack traffic...', 'info');
      
      setTimeout(() => {
        addLog('Attack detection initiated', 'warning');
      }, 1000);

      setTimeout(() => {
        addLog('Defense mechanisms activated', 'success');
        setIsRunning(false);
      }, 2000);
    } catch (error) {
      addLog('Simulation error occurred', 'error');
      setIsRunning(false);
    }
  };

  const addLog = (message: string, type: StatusLog['type']) => {
    const timestamp = new Date().toLocaleTimeString();
    setStatusLogs((prev) => [...prev, { timestamp, message, type }].slice(-20));
  };

  const getLogColor = (type: StatusLog['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gray-900/60 border border-gray-800 rounded-lg overflow-hidden mb-8"
    >
      <div className="border-b border-gray-800 px-6 py-4 flex items-center gap-3">
        <Zap className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-bold">Simulation Control Panel</h2>
      </div>

      <div className="p-6 space-y-6">
        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Attack Type */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Attack Type</label>
            <select
              value={config.attackType}
              onChange={(e) => setConfig({ ...config, attackType: e.target.value })}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm disabled:opacity-50"
            >
              {attackTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Intensity Slider */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">
              Intensity: {config.intensity}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={config.intensity}
              onChange={(e) => setConfig({ ...config, intensity: parseInt(e.target.value) })}
              disabled={isRunning}
              className="w-full disabled:opacity-50"
            />
          </div>

          {/* Target Device */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Target Device</label>
            <select
              value={config.targetDevice}
              onChange={(e) => setConfig({ ...config, targetDevice: e.target.value })}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm disabled:opacity-50"
            >
              {devices.map((device) => (
                <option key={device} value={device}>
                  {device}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Duration (s)</label>
            <input
              type="number"
              min="10"
              max="300"
              value={config.duration}
              onChange={(e) => setConfig({ ...config, duration: parseInt(e.target.value) })}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm disabled:opacity-50"
            />
          </div>
        </div>

        {/* Run Button */}
        <motion.button
          onClick={handleRunSimulation}
          disabled={isRunning}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Play className="w-5 h-5" />
          {isRunning ? 'Simulation Running...' : 'Run Simulation'}
        </motion.button>

        {/* Status Logs */}
        <div className="bg-black/50 rounded border border-gray-800 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Settings className="w-4 h-4 text-gray-400" />
            <p className="text-xs font-semibold text-gray-400">Status Logs</p>
          </div>
          <div className="space-y-1 max-h-32 overflow-y-auto font-mono text-xs">
            {statusLogs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-gray-600 flex-shrink-0">[{log.timestamp}]</span>
                <span className={getLogColor(log.type)}>{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
