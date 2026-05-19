export async function GET() {
  const mockData = [
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
  ];

  return Response.json(mockData);
}
