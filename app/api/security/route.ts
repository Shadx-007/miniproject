export async function GET() {
  const mockData = {
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
  };

  return Response.json(mockData);
}
