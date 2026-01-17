import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface LeadFormData {
  name: string;
  email: string;
  brand?: string;
  projectType?: string;
  message?: string;
  companyWebsite?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as LeadFormData;

    // Validate honeypot field (should be empty to prevent spam)
    if (body.companyWebsite && body.companyWebsite.trim() !== '') {
      console.log('Honeypot field detected - likely spam');
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!body.email || !body.email.trim()) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!body.message || !body.message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Prepare email content for admin
    const adminEmailContent = `New Contact Form Submission

Name: ${body.name}
Email: ${body.email}
Brand/Hotel: ${body.brand || 'Not provided'}
Project Type: ${body.projectType || 'Not specified'}

Message:
${body.message}`;

    // Prepare email content for user
    const userEmailContent = `Thank you for reaching out!

We received your message and will get back to you shortly.

Best regards,
Sassy Studio`;

    // Send email to admin
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'contacto@sassystudio.com.mx',
      subject: `New Contact Form Submission from ${body.name}`,
      text: adminEmailContent,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: body.email,
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
