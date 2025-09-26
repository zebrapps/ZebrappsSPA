import { Resend } from 'resend';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  // Always set JSON content type and CORS headers first
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      return res.status(200).json({ ok: true });
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({
        ok: false,
        error: 'Method not allowed. Only POST requests are accepted.'
      });
    }

    // Initialize Resend inside the try block to catch initialization errors
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Debug logging
    console.log('Contact API called');
    console.log('Method:', req.method);
    console.log('Body:', req.body);
    console.log('Environment check:', {
      hasResendKey: !!process.env.RESEND_API_KEY,
      resendKeyPrefix: process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.substring(0, 5) + '...' : 'undefined',
      hasContactFrom: !!process.env.CONTACT_FROM,
      contactFrom: process.env.CONTACT_FROM,
      hasContactTo: !!process.env.CONTACT_TO,
      contactTo: process.env.CONTACT_TO,
      nodeEnv: process.env.NODE_ENV
    });
    const { name, email, message } = req.body;

    // Validate that all required fields are present
    if (!name || !email || !message) {
      return res.status(400).json({
        ok: false,
        error: 'Missing required fields. Name, email, and message are all required.'
      });
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        ok: false,
        error: 'Invalid email format.'
      });
    }

    // Validate environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return res.status(500).json({
        ok: false,
        error: 'Server configuration error'
      });
    }

    if (!process.env.CONTACT_FROM || !process.env.CONTACT_TO) {
      console.error('CONTACT_FROM or CONTACT_TO environment variables are not set');
      return res.status(500).json({
        ok: false,
        error: 'Server configuration error'
      });
    }

    // Send email using Resend
    const emailResult = await resend.emails.send({
      from: process.env.CONTACT_FROM,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1d1d1f; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #1d1d1f; margin-bottom: 10px;">Message:</h3>
            <div style="background: #ffffff; border: 1px solid #e9ecef; padding: 15px; border-radius: 8px; white-space: pre-wrap;">
${message}
            </div>
          </div>

          <hr style="border: none; border-top: 1px solid #e9ecef; margin: 30px 0;">

          <p style="color: #86868b; font-size: 14px; text-align: center;">
            This email was sent from the ZebrApps AI contact form.<br>
            You can reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}

---
This email was sent from the ZebrApps AI contact form.
You can reply directly to this email to respond to ${name}.
      `
    });

    console.log('Email sent successfully:', emailResult);

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error('Contact form error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });

    // Always return JSON, even on errors
    return res.status(500).json({
      ok: false,
      error: 'Failed to send email. Please try again later.',
      debug: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}