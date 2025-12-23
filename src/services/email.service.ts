import { Resend } from 'resend';
import { CONFIG } from '../utils/config';

const resend = new Resend(CONFIG.RESEND.API_KEY);

interface EmailData {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

interface CalendarInviteData {
  attendees: string[];
  startTime: Date;
  endTime: Date;
  subject: string;
  description: string;
  location?: string;
}

export const EmailService = {
  // Send regular email
  async sendEmail(data: EmailData) {
    try {
      const { to, subject, html, from = 'onboarding@resend.dev' } = data;
      const response = await resend.emails.send({
        from,
        to,
        subject,
        html,
      });
      return response;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  },

  // Send calendar invite
  async sendCalendarInvite(data: CalendarInviteData) {
    const { attendees, startTime, endTime, subject, description, location } = data;
    
    // Create iCal formatted date
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const icalData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SimplePrefab//Calendar//EN
BEGIN:VEVENT
UID:${Math.random().toString(36).substring(2)}
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startTime)}
DTEND:${formatDate(endTime)}
SUMMARY:${subject}
DESCRIPTION:${description}
${location ? `LOCATION:${location}` : ''}
END:VEVENT
END:VCALENDAR`;

    // Send email with calendar attachment
    try {
      for (const attendee of attendees) {
        await resend.emails.send({
          from: 'calendar@simpleprefab.com',
          to: attendee,
          subject: `Calendar Invite: ${subject}`,
          html: `<p>You have been invited to: ${subject}</p>
                 <p>Time: ${startTime.toLocaleString()} - ${endTime.toLocaleString()}</p>
                 <p>${description}</p>`,
          attachments: [{
            filename: 'invite.ics',
            content: Buffer.from(icalData).toString('base64'),
          }],
        });
      }
    } catch (error) {
      console.error('Error sending calendar invite:', error);
      throw error;
    }
  }
};