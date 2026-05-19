export async function POST(request: Request) {
  try {
    const body = await request.json();

    return Response.json({
      status: 'success',
      message: 'Simulation started successfully',
      simulationId: 'SIM-' + Date.now(),
      config: body,
      startTime: new Date().toISOString(),
      expectedDuration: body.duration || 60,
    });
  } catch (error) {
    return Response.json(
      { error: 'Failed to start simulation' },
      { status: 400 }
    );
  }
}
