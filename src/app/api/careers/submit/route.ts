import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const experienceLevel = formData.get('experienceLevel') as string;
    const department = formData.get('department') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const applyingFor = formData.get('applyingFor') as string;
    const resume = formData.get('resume') as File;

    // Validate required fields
    if (!fullName || !email || !phone || !resume) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Convert resume to base64
    const resumeBuffer = Buffer.from(await resume.arrayBuffer());
    const resumeBase64 = resumeBuffer.toString('base64');

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'SimplyPrefab Careers <onboarding@resend.dev>', // Use this for testing, or your verified domain
      to: ['delivered@resend.dev'], // Use this for testing, or your actual email
      replyTo: email,
      subject: `New Job Application - ${applyingFor || 'General Application'}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { 
                background: linear-gradient(135deg, #FB921D 0%, #C55A00 100%); 
                color: white; 
                padding: 20px; 
                border-radius: 8px 8px 0 0; 
              }
              .content { 
                background: #f9f9f9; 
                padding: 20px; 
                border: 1px solid #ddd; 
                border-top: none; 
                border-radius: 0 0 8px 8px; 
              }
              .field { 
                margin-bottom: 15px; 
                padding: 10px; 
                background: white; 
                border-radius: 4px; 
              }
              .label { 
                font-weight: bold; 
                color: #FB921D; 
                display: block; 
                margin-bottom: 5px; 
              }
              .value { 
                color: #333; 
              }
              .cover-letter { 
                background: white; 
                padding: 15px; 
                border-left: 4px solid #FB921D; 
                margin-top: 10px; 
                white-space: pre-wrap; 
              }
              .footer { 
                text-align: center; 
                margin-top: 20px; 
                color: #666; 
                font-size: 12px; 
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">🎉 New Job Application Received</h2>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">Full Name:</span>
                  <span class="value">${fullName}</span>
                </div>
                <div class="field">
                  <span class="label">Email:</span>
                  <span class="value"><a href="mailto:${email}" style="color: #FB921D;">${email}</a></span>
                </div>
                <div class="field">
                  <span class="label">Phone:</span>
                  <span class="value">${phone}</span>
                </div>
                <div class="field">
                  <span class="label">Experience Level:</span>
                  <span class="value">${experienceLevel}</span>
                </div>
                <div class="field">
                  <span class="label">Department:</span>
                  <span class="value">${department}</span>
                </div>
                <div class="field">
                  <span class="label">Applying For:</span>
                  <span class="value">${applyingFor || 'Not specified'}</span>
                </div>
                ${coverLetter ? `
                  <div class="field">
                    <span class="label">Cover Letter:</span>
                    <div class="cover-letter">${coverLetter}</div>
                  </div>
                ` : ''}
                <div class="field">
                  <span class="label">📎 Resume:</span>
                  <span class="value">${resume.name} (Attached)</span>
                </div>
              </div>
              <div class="footer">
                <p>This application was submitted through SimplyPrefab Careers page</p>
                <p style="color: #FB921D;">simplyprefab.com</p>
              </div>
            </div>
          </body>
        </html>
      `,
      attachments: [
        {
          filename: resume.name,
          content: resumeBase64,
        },
      ],
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to send email', 
          error: error.message 
        },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);

    return NextResponse.json(
      { success: true, message: 'Application submitted successfully', data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error submitting application:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit application', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}
