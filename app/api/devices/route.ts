export async function GET() {
  const mockData = [
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
  ];

  return Response.json(mockData);
}
