export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { attackType, failedLogins = 0, requestsPerMinute = 0 } = body;

    // Determine threat level based on attack type and input values
    let status = 'Normal';
    let severity = 'Low';
    let message = 'System is secure - no threats detected';
    let anomalyDetected = false;
    let mitigation = null;
    let detectionTime = 0.3 + Math.random() * 0.4; // 0.3-0.7s
    let responseTime = 0.8 + Math.random() * 0.6; // 0.8-1.4s
    let fixTime = 1.5 + Math.random() * 1.0; // 1.5-2.5s

    switch (attackType) {
      case 'Brute Force Attack':
        anomalyDetected = failedLogins > 8;
        if (anomalyDetected) {
          status = failedLogins > 12 ? 'High' : 'Medium';
          severity = failedLogins > 12 ? 'Critical' : 'High';
          message = `Brute force attack detected - ${failedLogins} failed login attempts in short interval`;
          mitigation = 'System applied: account lockout + CAPTCHA challenge + IP rate limiting';
        }
        break;

      case 'Traffic Spike (DDoS)':
        anomalyDetected = requestsPerMinute > 1500;
        if (anomalyDetected) {
          status = requestsPerMinute > 2500 ? 'High' : 'Medium';
          severity = requestsPerMinute > 2500 ? 'Critical' : 'High';
          message = `DDoS simulation detected - ${requestsPerMinute} requests/minute from multiple sources`;
          mitigation = 'System applied: request filtering + traffic throttling + geographic blocking';
        }
        break;

      case 'Suspicious Device Activity':
        anomalyDetected = Math.random() > 0.4; // 60% chance of detection
        if (anomalyDetected) {
          status = 'Medium';
          severity = 'High';
          message = 'Suspicious device behavior detected - unusual access patterns and locations';
          mitigation = 'System applied: device verification + session invalidation + security alert sent';
        }
        break;

      default:
        // Combined detection
        anomalyDetected = failedLogins > 10 || requestsPerMinute > 2000;
        if (anomalyDetected) {
          if (failedLogins > 12 || requestsPerMinute > 2500) {
            status = 'High';
            severity = 'Critical';
            message = 'High-risk anomaly detected - immediate action required';
          } else {
            status = 'Medium';
            severity = 'High';
            message = 'Medium-risk anomaly detected - monitoring required';
          }
          mitigation = 'System automatically applied rate limiting and suspicious activity blocking';
        }
    }

    return Response.json({
      status,
      severity,
      message,
      anomalyDetected,
      attackType,
      timestamp: new Date().toISOString(),
      mitigation,
      timeline: {
        detection: detectionTime,
        response: responseTime,
        completion: fixTime,
      },
    });
  } catch (error) {
    return Response.json(
      { error: 'Failed to process security check' },
      { status: 400 }
    );
  }
}
