'use client';

import { useState, useEffect } from 'react';

// Mock data fallback
const mockData = {
  security: {
    riskScore: 2.4,
    riskTrend: -0.8,
    activeAlerts: 16,
    criticalAlerts: 4,
    alertsTrend: -3,
    devicesConnected: 1247,
    secureDevices: 1231,
    devicesTrend: 12,
    threatsBlocked: 89,
    threatsTrend: 23,
    threatTrends: [
      { time: '00:00', threats: 12 },
      { time: '04:00', threats: 8 },
      { time: '08:00', threats: 15 },
      { time: '12:00', threats: 10 },
      { time: '16:00', threats: 22 },
      { time: '20:00', threats: 18 },
      { time: '24:00', threats: 9 },
    ],
    alertsByCategory: [
      { category: 'Critical', count: 4 },
      { category: 'High', count: 12 },
      { category: 'Medium', count: 28 },
      { category: 'Low', count: 45 },
    ],
    recentEvents: [
      { id: 1, event: 'Suspicious Login Attempt', severity: 'Critical', time: '2 min ago', status: 'Blocked' },
      { id: 2, event: 'DDoS Attack Detected', severity: 'High', time: '15 min ago', status: 'Mitigated' },
      { id: 3, event: 'Malware Signature Match', severity: 'High', time: '1 hour ago', status: 'Quarantined' },
      { id: 4, event: 'Unusual Network Traffic', severity: 'Medium', time: '3 hours ago', status: 'Monitoring' },
      { id: 5, event: 'Port Scan Detected', severity: 'Medium', time: '5 hours ago', status: 'Blocked' },
    ],
    activeThreats: [
      { id: 1, type: 'Malware', severity: 'Critical', status: 'Active', deviceCount: 2 },
      { id: 2, type: 'Intrusion Attempt', severity: 'High', status: 'Detected', deviceCount: 1 },
      { id: 3, type: 'Suspicious Activity', severity: 'Medium', status: 'Monitoring', deviceCount: 3 },
    ],
  },
  devices: [
    { id: 1, name: 'Server-01', ip: '192.168.1.10', status: 'online', activity: 'High', lastSeen: 'Now', type: 'Server' },
    { id: 2, name: 'Workstation-05', ip: '192.168.1.45', status: 'online', activity: 'Medium', lastSeen: '2 min ago', type: 'Desktop' },
    { id: 3, name: 'IoT-Sensor-12', ip: '192.168.1.78', status: 'online', activity: 'Low', lastSeen: '5 min ago', type: 'IoT' },
    { id: 4, name: 'Router-Main', ip: '192.168.1.1', status: 'online', activity: 'High', lastSeen: 'Now', type: 'Network' },
    { id: 5, name: 'Printer-02', ip: '192.168.1.55', status: 'online', activity: 'Low', lastSeen: '15 min ago', type: 'Printer' },
    { id: 6, name: 'NAS-Storage', ip: '192.168.1.20', status: 'online', activity: 'Medium', lastSeen: '1 min ago', type: 'Storage' },
    { id: 7, name: 'Workstation-03', ip: '192.168.1.42', status: 'offline', activity: 'None', lastSeen: '2 hours ago', type: 'Desktop' },
    { id: 8, name: 'IoT-Camera-08', ip: '192.168.1.88', status: 'online', activity: 'Low', lastSeen: '30 sec ago', type: 'IoT' },
    { id: 9, name: 'Server-02', ip: '192.168.1.11', status: 'online', activity: 'High', lastSeen: 'Now', type: 'Server' },
    { id: 10, name: 'Laptop-Guest', ip: '192.168.1.99', status: 'offline', activity: 'None', lastSeen: '8 hours ago', type: 'Desktop' },
  ],
  alerts: [
    { id: 1, type: 'Malware Detected', severity: 'Critical', time: '2024-04-16 14:23', status: 'Active', device: 'Server-01' },
    { id: 2, type: 'DDoS Attack', severity: 'Critical', time: '2024-04-16 13:45', status: 'Mitigated', device: 'Router-Main' },
    { id: 3, type: 'Unauthorized Access', severity: 'High', time: '2024-04-16 13:12', status: 'Investigating', device: 'Workstation-05' },
    { id: 4, type: 'Suspicious Login', severity: 'High', time: '2024-04-16 12:55', status: 'Blocked', device: 'Server-02' },
    { id: 5, type: 'Port Scan Detected', severity: 'High', time: '2024-04-16 12:30', status: 'Blocked', device: 'Network-01' },
    { id: 6, type: 'Unusual Traffic Pattern', severity: 'Medium', time: '2024-04-16 11:45', status: 'Monitoring', device: 'NAS-Storage' },
    { id: 7, type: 'Certificate Expiration', severity: 'Medium', time: '2024-04-16 10:20', status: 'Resolved', device: 'Server-01' },
    { id: 8, type: 'Software Update Available', severity: 'Low', time: '2024-04-16 09:15', status: 'Pending', device: 'Workstation-03' },
    { id: 9, type: 'High Memory Usage', severity: 'Low', time: '2024-04-16 08:45', status: 'Monitoring', device: 'IoT-Sensor-12' },
    { id: 10, type: 'Failed Backup', severity: 'Medium', time: '2024-04-16 07:30', status: 'Resolved', device: 'NAS-Storage' },
    { id: 11, type: 'Vulnerability Scan Results', severity: 'High', time: '2024-04-16 06:15', status: 'Resolved', device: 'Server-02' },
    { id: 12, type: 'Policy Violation', severity: 'Medium', time: '2024-04-16 05:00', status: 'Investigating', device: 'Workstation-05' },
  ],
  analytics: {
    riskTrends: [
      { date: 'Day 1', risk: 4.2 },
      { date: 'Day 2', risk: 3.8 },
      { date: 'Day 3', risk: 5.1 },
      { date: 'Day 4', risk: 3.2 },
      { date: 'Day 5', risk: 2.9 },
      { date: 'Day 6', risk: 3.5 },
      { date: 'Day 7', risk: 2.4 },
    ],
    deviceActivity: [
      { date: 'Day 1', active: 1100, inactive: 147 },
      { date: 'Day 2', active: 1210, inactive: 37 },
      { date: 'Day 3', active: 1290, inactive: 57 },
      { date: 'Day 4', active: 1150, inactive: 97 },
      { date: 'Day 5', active: 1230, inactive: 17 },
      { date: 'Day 6', active: 1200, inactive: 47 },
      { date: 'Day 7', active: 1231, inactive: 16 },
    ],
    threatTypes: [
      { type: 'Malware', count: 45 },
      { type: 'Phishing', count: 32 },
      { type: 'DDoS', count: 28 },
      { type: 'Intrusion', count: 19 },
      { type: 'Exploit', count: 15 },
    ],
  },
};

export interface SecurityData {
  riskScore: number;
  riskTrend: number;
  activeAlerts: number;
  criticalAlerts: number;
  alertsTrend: number;
  devicesConnected: number;
  secureDevices: number;
  devicesTrend: number;
  threatsBlocked: number;
  threatsTrend: number;
  threatTrends: Array<{ time: string; threats: number }>;
  alertsByCategory: Array<{ category: string; count: number }>;
  recentEvents: Array<{ id: number; event: string; severity: string; time: string; status: string }>;
  activeThreats: Array<{ id: number; type: string; severity: string; status: string; deviceCount: number }>;
}

export function useSecurity() {
  const [data, setData] = useState<SecurityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/security');
      if (!response.ok) throw new Error('Failed to fetch security data');
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Security API error:', err);
      setData(mockData.security as SecurityData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}

export function useDevices() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/devices');
      if (!response.ok) throw new Error('Failed to fetch devices data');
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Devices API error:', err);
      setData(mockData.devices);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}

export function useAlerts() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/alerts');
      if (!response.ok) throw new Error('Failed to fetch alerts data');
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Alerts API error:', err);
      setData(mockData.alerts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}

export function useAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/analytics');
      if (!response.ok) throw new Error('Failed to fetch analytics data');
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Analytics API error:', err);
      setData(mockData.analytics);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}
