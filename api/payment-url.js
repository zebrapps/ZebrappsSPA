module.exports = async function handler(req, res) {
  // Set JSON content type and CORS headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      return res.status(200).json({ ok: true });
    }

    // Only allow GET requests
    if (req.method !== 'GET') {
      return res.status(405).json({
        ok: false,
        error: 'Method not allowed. Only GET requests are accepted.'
      });
    }

    // Return the payment URL from environment variable
    const paymentUrl = process.env.PAYMENT_URL;

    if (!paymentUrl) {
      console.error('PAYMENT_URL environment variable is not set');
      return res.status(500).json({
        ok: false,
        error: 'Payment URL not configured'
      });
    }

    return res.status(200).json({
      ok: true,
      paymentUrl: paymentUrl
    });

  } catch (error) {
    console.error('Payment URL API error:', error);
    return res.status(500).json({
      ok: false,
      error: 'Failed to retrieve payment URL'
    });
  }
}
