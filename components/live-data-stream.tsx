'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertCircle, Shield } from 'lucide-react';

interface DataEvent {
  id: string;
  type: 'packet' | 'activity' | 'decision';
  message: string;
  source?: string;
  timestamp: string;
}

export default function LiveDataStream() {
  const [dataEvents, setDataEvents] = useState<DataEvent[]>([
    {
      id: '1',
      type: 'packet',
      message: 'Incoming packet from 192.168.1.105:52341',
      source: '192.168.1.105',
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: '2',
      type: 'activity',
      message: 'Suspicious login attempt detected',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const eventTypes: Array<'packet' | 'activity' | 'decision'> = ['packet', 'activity', 'decision'];
      const messages = {
        packet: [
          'Packet received from external source',
          'DNS query intercepted',
          'TCP handshake initiated',
          'SSL certificate validation',
        ],
        activity: [
          'Suspicious behavior detected',
          'Rate limit exceeded',
          'Geolocation anomaly',
          'Device fingerprint mismatch',
        ],
        decision: [
          'AI analyzing threat vector',
          'ML model processing data',
          'Risk score calculated',
          'Mitigation strategy selected',
        ],
      };

      const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const randomMessage = messages[randomType][Math.floor(Math.random() * messages[randomType].length)];

      const newEvent: DataEvent = {
        id: Date.now().toString(),
        type: randomType,
        message: randomMessage,
        source: randomType === 'packet' ? `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}` : undefined,
        timestamp: new Date().toLocaleTimeString(),
      };

      setDataEvents((prev) => [newEvent, ...prev].slice(0, 15));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: DataEvent['type']) => {
    switch (type) {
      case 'packet':
        return <Activity className="w-4 h-4 text-blue-400" />;
      case 'activity':
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'decision':
        return <Shield className="w-4 h-4 text-green-400" />;
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
        <Activity className="w-6 h-6 text-green-400" />
        <h2 className="text-xl font-bold">Live Data Stream</h2>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-400">LIVE</span>
        </div>
      </div>

      <div className="bg-black/30 p-4 max-h-64 overflow-y-auto font-mono text-xs">
        {dataEvents.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-3 py-2 border-b border-gray-800/50 last:border-0"
          >
            {getIcon(event.type)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-gray-300 truncate">{event.message}</span>
                <span className="text-gray-600 flex-shrink-0">{event.timestamp}</span>
              </div>
              {event.source && <div className="text-gray-500 text-xs mt-1">Source: {event.source}</div>}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
