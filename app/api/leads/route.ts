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
  website: z.string()
    .max(255, 'Website must be less than 255 characters')
    .trim()
    .optional()
    .default(''),
  locale: z.enum(['en', 'es'])
    .optional()
    .default('es'),
  source: z.string()
    .max(60, 'Source must be less than 60 characters')
    .trim()
    .optional()
    .default(''),
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
    const from = process.env.RESEND_FROM_EMAIL || 'Sassy Studio <onboarding@resend.dev>';
    const recipient = process.env.RESEND_TO_EMAIL || 'contacto@sassystudio.com.mx';

    // Prepare email content for admin
    const adminEmailContent = `New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
Brand/Hotel: ${formData.brand || 'Not provided'}
Project Type: ${formData.projectType || 'Not specified'}
Website: ${formData.website || 'Not provided'}
Source page: ${formData.source || 'Unknown'}

Message:
${formData.message}`;

    // Confirmation email copy per submitter locale
    const userEmailCopy = formData.locale === 'en'
      ? {
        subject: 'We received your message',
        body: `Thank you for reaching out!

We received your message and will get back to you shortly.

Best regards,
Sassy Studio`,
      }
      : {
        subject: 'Hemos recibido tu mensaje',
        body: `¡Gracias por contactarnos!

Hemos recibido tu mensaje y te responderemos en breve.

Saludos,
Sassy Studio`,
      };

    // Send email to admin
    const adminEmail = await resend.emails.send({
      from,
      replyTo: formData.email,
      to: recipient,
      subject: `New Contact Form Submission from ${formData.name} (${formData.source || 'unknown'})`,
      text: adminEmailContent,
    });

    if (adminEmail.error) {
      console.error('Failed to send lead notification:', adminEmail.error);
      return NextResponse.json(
        { error: 'Unable to send your message. Please try again.' },
        { status: 502 }
      );
    }

    // Send confirmation email to user
    const confirmationEmail = await resend.emails.send({
      from,
      replyTo: recipient,
      to: formData.email,
      subject: userEmailCopy.subject,
      text: userEmailCopy.body,
    });

    if (confirmationEmail.error) {
      console.error('Failed to send lead confirmation:', confirmationEmail.error);
    }

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
