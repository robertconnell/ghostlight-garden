import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const { 
      name, 
      email, 
      phone, 
      description, 
      additionalNotes 
    } = await request.json();

    // Validate required fields
    if (!name || !email || !phone || !description) {
      return NextResponse.json(
        { error: 'All required fields must be filled out' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return NextResponse.json(
        { error: 'Email service not configured. Please try again later.' },
        { status: 500 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'noreply@ghostlightgarden.com',
      to: 'info@ghostlightgarden.com',
      subject: `Commission Request from ${name}`,
      html: `
        <h2>New Commission Request</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #6f42c1; margin-top: 0;">Contact Details</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #6f42c1; margin-top: 0;">Project Description</h3>
          <p>${description.replace(/\n/g, '<br>')}</p>
        </div>
        

        
        ${additionalNotes ? `
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #6f42c1; margin-top: 0;">Additional Notes</h3>
          <p>${additionalNotes.replace(/\n/g, '<br>')}</p>
        </div>
        ` : ''}
        
        <div style="background-color: #e9ecef; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #6c757d;">
            <strong>Submitted:</strong> ${new Date().toLocaleString()}<br>
            <strong>IP Address:</strong> ${request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'}
          </p>
        </div>
      `
    });
    
    if (error) {
      console.error('Commission email sending failed:', error);
      console.error('Full error details:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: 'Failed to send commission request. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you! Your commission request has been sent successfully. We\'ll get back to you within 24 hours.' 
    });

  } catch (error) {
    console.error('Commission form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
