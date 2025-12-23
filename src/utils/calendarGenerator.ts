import ical, { ICalCalendar } from 'ical-generator';

const RESEND_CONFIG = {
    FROM_EMAIL: 'onboarding@resend.dev' // process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
};

export function generateCalendarInvite(bookingData: any): string {
    const calendar: ICalCalendar = ical({ name: 'SimplyPrefab Consultation' });

    try {
        // Parse date and time
        const appointmentDate = new Date(bookingData.appointmentDate);
        const timeString = bookingData.appointmentTime || '10:00';
        const [hours, minutes] = timeString.split(':');
        appointmentDate.setHours(parseInt(hours), parseInt(minutes), 0);

        // Calculate end time (1 hour after start)
        const endDate = new Date(appointmentDate.getTime() + 60 * 60 * 1000);

        // Create event
        calendar.createEvent({
            start: appointmentDate,
            end: endDate,
            summary: `${bookingData.consultationType || 'Consultation'} - SimplyPrefab`,
            description: `Your consultation with SimplyPrefab.\n\nBooking ID: ${bookingData.bookingId}\nCustomer: ${bookingData.customerName}\n\nWe look forward to speaking with you!`,
            location: 'Video Call (link will be sent separately)',
            url: 'https://simplyprefab.com',
            organizer: {
                name: 'SimplyPrefab Team',
                email: RESEND_CONFIG.FROM_EMAIL
            },
            attendees: [
                {
                    name: bookingData.customerName,
                    email: bookingData.customerEmail,
                    rsvp: true,
                    status: 'NEEDS-ACTION' as any,
                    type: 'INDIVIDUAL' as any
                }
            ],
            alarms: [
                {
                    type: 'display' as any,
                    trigger: 3600, // 1 hour before
                    description: 'Reminder: Your SimplyPrefab consultation starts in 1 hour'
                },
                {
                    type: 'display' as any,
                    trigger: 86400, // 24 hours before
                    description: 'Reminder: Your SimplyPrefab consultation is tomorrow'
                }
            ]
        });

        return calendar.toString();
    } catch (error: any) {
        console.error('Error generating calendar invite:', error);
        // Return a basic calendar if parsing fails
        return calendar.toString();
    }
}
