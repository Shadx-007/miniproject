export async function GET(request: Request) {
  try {
    return Response.json({
      status: 'success',
      stats: {
        threatsDetected: Math.floor(Math.random() * 100) + 50,
        avgResponseTime: (Math.random() * 0.5 + 0.3).toFixed(2),
        devicesMonitored: Math.floor(Math.random() * 500) + 100,
        successRate: (Math.random() * 15 + 85).toFixed(1),
        incidentsResolved: Math.floor(Math.random() * 50) + 25,
        lastUpdate: new Date().toISOString(),
      },
    });
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch stats' },
      { status: 400 }
    );
  }
}
