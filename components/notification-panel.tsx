'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Bell, User, CheckCircle, Send } from 'lucide-react';

interface Notification {
  id: number;
  type: 'email' | 'alert' | 'admin';
  title: string;
  message: string;
  recipient: string;
  status: 'sent' | 'pending' | 'failed';
  timestamp: string;
}

export default function NotificationPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'email',
      title: 'Security Alert Email',
      message: 'Threat detection notification sent to admin@company.com',
      recipient: 'admin@company.com',
      status: 'sent',
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: 2,
      type: 'alert',
      title: 'Push Notification',
      message: 'Critical threat alert pushed to mobile devices',
      recipient: 'All Devices',
      status: 'sent',
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: 3,
      type: 'admin',
      title: 'Admin Notification',
      message: 'Incident escalated to security team',
      recipient: 'Security Team',
      status: 'sent',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'email':
        return <Mail className="w-5 h-5 text-blue-400" />;
      case 'alert':
        return <Bell className="w-5 h-5 text-yellow-400" />;
      case 'admin':
        return <User className="w-5 h-5 text-purple-400" />;
    }
  };

  const getStatusColor = (status: Notification['status']) => {
    switch (status) {
      case 'sent':
        return 'bg-green-900/20 border-green-700/30 text-green-300';
      case 'pending':
        return 'bg-yellow-900/20 border-yellow-700/30 text-yellow-300';
      case 'failed':
        return 'bg-red-900/20 border-red-700/30 text-red-300';
    }
  };

  const addNotification = () => {
    const newNotif: Notification = {
      id: Date.now(),
      type: ['email', 'alert', 'admin'][Math.floor(Math.random() * 3)] as Notification['type'],
      title: 'New Notification',
      message: 'System generated notification',
      recipient: 'user@company.com',
      status: 'sent',
      timestamp: new Date().toLocaleTimeString(),
    };
    setNotifications((prev) => [newNotif, ...prev].slice(0, 10));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Notifications Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gray-900/60 border border-gray-800 rounded-lg overflow-hidden"
      >
        <div className="border-b border-gray-800 px-6 py-4 flex items-center gap-3">
          <Bell className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-bold">Notifications & Alerts</h2>
        </div>

        <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
          {notifications.map((notif, idx) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={`p-4 rounded-lg border flex items-start gap-3 ${getStatusColor(notif.status)}`}
            >
              <div className="flex-shrink-0 mt-0.5">{getIcon(notif.type)}</div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{notif.title}</p>
                <p className="text-xs opacity-80 mt-1">{notif.message}</p>
                <p className="text-xs opacity-60 mt-2">{notif.recipient}</p>
              </div>
              <div className="flex-shrink-0">
                {notif.status === 'sent' && <CheckCircle className="w-4 h-4" />}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Send Notification */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="bg-gray-900/60 border border-gray-800 rounded-lg overflow-hidden"
      >
        <div className="border-b border-gray-800 px-6 py-4 flex items-center gap-3">
          <Send className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-bold">Send Notification</h2>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Notification Type</label>
            <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm">
              <option>Email Alert</option>
              <option>Push Notification</option>
              <option>Admin Alert</option>
              <option>SMS Message</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Recipient</label>
            <input
              type="text"
              placeholder="admin@company.com"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Message</label>
            <textarea
              placeholder="Enter notification message..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm resize-none h-24"
            ></textarea>
          </div>

          <motion.button
            onClick={addNotification}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send Notification
          </motion.button>

          <div className="p-3 bg-green-900/20 border border-green-700/30 rounded-lg">
            <p className="text-xs text-green-300 font-medium">
              ✓ Last notification sent successfully
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
