import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { checkRateLimit, getClientIP } from '@/lib/utils/rateLimit';
import { RATE_LIMITS, isRateLimitingEnabled } from '@/lib/config/rateLimits';

// Define validation schema for lead form submissions
const LeadFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters'),
  brand: z.string()
    .max(100, 'Brand must be less than 100 characters')
    .trim()
    .optional()
    .default(''),
  projectType: z.string()
    .max(100, 'Project type must be less than 100 characters')
    .trim()
    .optional()
    .default(''),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters')
    .trim(),
  companyWebsite: z.string()
    .max(0, 'Invalid submission') // Honeypot field - must be empty
    .optional()
    .default(''),
});

export async function POST(request: NextRequest) {
  try {
    // Check rate limit by IP address
    if (isRateLimitingEnabled()) {
      const clientIP = getClientIP(request);
      const rateLimit = RATE_LIMITS.LEADS_SUBMIT;
      const limitCheck = checkRateLimit(
        `leads:${clientIP}`,
        rateLimit.requests,
        rateLimit.windowMs
      );

      if (!limitCheck.allowed && limitCheck.response) {
        return limitCheck.response;
      }
    }

    // Verify API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();

    // Validate request body against schema
    const validationResult = LeadFormSchema.safeParse(body);
    
    if (!validationResult.success) {
      const errors = validationResult.error.issues
        .map((issue: any) => `${issue.path.join('.')}: ${issue.message}`)
        .join('; ');
      
      return NextResponse.json(
        { error: 'Invalid submission', details: errors },
        { status: 400 }
      );
    }

    const formData = validationResult.data;

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Prepare email content for admin
    const adminEmailContent = `New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
Brand/Hotel: ${formData.brand || 'Not provided'}
Project Type: ${formData.projectType || 'Not specified'}

Message:
${formData.message}`;

    // Prepare email content for user
    const userEmailContent = `Thank you for reaching out!

We received your message and will get back to you shortly.

Best regards,
Sassy Studio`;

    // Send email to admin
    await resend.emails.send({
      from: 'amslewis@gmail.com',
      to: 'contacto@sassystudio.com.mx',
      subject: `New Contact Form Submission from ${formData.name}`,
      text: adminEmailContent,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: 'amslewis@gmail.com',
      to: formData.email,
      subject: 'We received your message',
      text: userEmailContent,
    });

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing lead submission:', error);
    return NextResponse.json(
      { error: 'Failed to process submission. Please try again.' },
      { status: 500 }
    );
  }
}
