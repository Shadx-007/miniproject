export async function GET() {
  const mockData = {
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
  };

  return Response.json(mockData);
}
